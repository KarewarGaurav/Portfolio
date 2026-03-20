import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Add the pool cache to the global object to prevent 
// multiple connections during hot-reloading in dev.
declare global {
  var pool: Pool | undefined;
  var lastDbUrl: string | undefined;
}

const VISITOR_FILE = path.join(process.cwd(), '.visitors.json');

// Ensure we don't create multiple connection pools in development
// Re-initialize if the DATABASE_URL has changed
if (!global.pool || global.lastDbUrl !== process.env.DATABASE_URL) {
  if (global.pool) {
    global.pool.end().catch(err => console.error("Error closing old pool", err));
  }
  global.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Note: Supabase requires SSL for external connections
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000 // 5s timeout to trigger fallback quickly
  });
  global.lastDbUrl = process.env.DATABASE_URL;
}
const pool = global.pool;

// Local fallback logic
async function getLocalVisitorCount(ip: string) {
  try {
    let data = { count: 0, ips: [] as string[] };
    if (fs.existsSync(VISITOR_FILE)) {
      data = JSON.parse(fs.readFileSync(VISITOR_FILE, 'utf-8'));
    }
    
    if (!data.ips.includes(ip)) {
      data.ips.push(ip);
      data.count = data.ips.length;
      fs.writeFileSync(VISITOR_FILE, JSON.stringify(data, null, 2));
    }
    
    return data.count;
  } catch (err) {
    console.error("Local visitor counter error", err);
    return 1;
  }
}

export async function GET(req: Request) {
  let ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
  
  // In case there are multiple IPs in the header, get the first one
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim();
  }

  try {
    const client = await pool.connect();
    
    try {
      // 1. Create the table if it does not exist
      await client.query(`
        CREATE TABLE IF NOT EXISTS visitors (
          ip VARCHAR(255) PRIMARY KEY,
          visited_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 2. Insert the IP if it's new (Do nothing if it already exists)
      await client.query(`
        INSERT INTO visitors (ip) 
        VALUES ($1) 
        ON CONFLICT (ip) DO NOTHING;
      `, [ip]);

      // 3. Get the total count of unique visitors
      const result = await client.query('SELECT COUNT(*) as count FROM visitors;');
      const count = parseInt(result.rows[0].count, 10);

      return NextResponse.json({ count });
    } finally {
      client.release(); // Return the client to the connection pool
    }
  } catch (error) {
    console.warn("Supabase visitor counter failed, using local fallback", error instanceof Error ? error.message : error);
    const count = await getLocalVisitorCount(ip);
    return NextResponse.json({ count });
  }
}

