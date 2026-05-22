"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/ContentCard";
import { RatingBadge } from "@/components/RatingBadge";
import { SECTORS } from "@/lib/constants";
import type { StockReport, Rating, Sector } from "@/lib/types";

export function StockReportsList({ reports }: { reports: StockReport[] }) {
  const [sector, setSector] = useState<Sector | "all">("all");
  const [rating, setRating] = useState<Rating | "all">("all");

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (sector !== "all" && r.sector !== sector) return false;
      if (rating !== "all" && r.rating !== rating) return false;
      return true;
    });
  }, [reports, sector, rating]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-midnight">Stock Reports</h1>
      <p className="mt-2 text-text-muted">
        Initiations, updates, and ratings with price targets.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 border-b border-border pb-6">
        <div>
          <label className="text-xs font-semibold uppercase text-text-muted">Sector</label>
          <select
            className="mt-1 block border border-border px-3 py-2 text-sm"
            value={sector}
            onChange={(e) => setSector(e.target.value as Sector | "all")}
          >
            <option value="all">All</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-text-muted">Rating</label>
          <div className="mt-2 flex gap-2">
            {(["all", "BUY", "HOLD", "SELL"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRating(r)}
                className={`border px-3 py-1 text-xs ${
                  rating === r ? "border-midnight bg-midnight text-white" : "border-border"
                }`}
              >
                {r === "all" ? "All" : <RatingBadge rating={r} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((report) => (
          <ContentCard key={report.id} type="report" data={report} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-text-muted">No reports match your filters.</p>
      )}
    </div>
  );
}
