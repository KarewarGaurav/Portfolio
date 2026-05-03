"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    // Try to load cached count immediately for a faster UI experience
    const cachedCount = localStorage.getItem("visitor_count");
    if (cachedCount) {
      const parsed = parseInt(cachedCount, 10);
      if (!Number.isNaN(parsed) && parsed >= 0) {
        setCount(parsed);
      }
    }

    fetch("/api/visitor", { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || `Request failed with status ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        if (typeof data.count === "number" && data.count >= 0) {
          setCount(data.count);
          localStorage.setItem("visitor_count", data.count.toString());
        } else {
          setLoadFailed(true);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch visitor count", err);
        setLoadFailed(true);
      });
  }, []);

  if (count === null && loadFailed) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
        <div className="rounded-full bg-accent/50 text-foreground p-1 flex items-center justify-center">
          <Eye size={14} />
        </div>
        <span>Thanks for visiting</span>
      </div>
    );
  }

  if (count === null) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/40 px-3 py-1.5 h-8 shadow-sm transition-all w-[140px] animate-pulse">
        <div className="rounded-full bg-accent text-accent-foreground p-1 flex items-center justify-center opacity-50">
          <Eye size={14} />
        </div>
      </div>
    );
  }

  // Determine the ordinal suffix for the number
  const getOrdinalSuffix = (i: number) => {
    const j = i % 10,
          k = i % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm transition-all hover:bg-accent/10">
      <div className="rounded-full bg-accent/50 text-foreground p-1 flex items-center justify-center">
        <Eye size={14} />
      </div>
      <span>
        You are the <strong className="text-foreground font-semibold">{count.toLocaleString()}{getOrdinalSuffix(count)}</strong> visitor
      </span>
    </div>
  );
}
