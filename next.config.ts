import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Smaller production trace: faster cold starts on Docker/VPS (copy public + .next/static per Next docs)
  output: "standalone",
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@mui/material",
      "react-icons",
    ],
  },
};

export default nextConfig;
