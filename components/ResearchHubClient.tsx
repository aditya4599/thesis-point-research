"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Grid, List, Search } from "lucide-react";
import {
  FilterSidebar,
  type FilterState,
} from "@/components/FilterSidebar";
import { SectorBadge } from "@/components/SectorBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTENT_TYPE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { ResearchItem } from "@/lib/types";

const typeBadgeVariant = {
  article: "article",
  "stock-report": "report",
  pitch: "pitch",
  "sector-note": "sector",
} as const;

function filterByDate(date: string, range: FilterState["dateRange"]) {
  const d = new Date(date);
  const now = new Date();
  if (range === "30d") {
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 30);
    return d >= cutoff;
  }
  if (range === "3m") {
    const cutoff = new Date(now);
    cutoff.setMonth(cutoff.getMonth() - 3);
    return d >= cutoff;
  }
  return true;
}

export function ResearchHubClient({ items }: { items: ResearchItem[] }) {
  const [filters, setFilters] = useState<FilterState>({
    contentType: "all",
    sector: "all",
    dateRange: "all",
    sort: "newest",
  });
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("list");
  const [mobileFilters, setMobileFilters] = useState(false);

  const activeChips = useMemo(() => {
    const chips: { key: string; label: string }[] = [];
    if (filters.contentType !== "all")
      chips.push({
        key: "contentType",
        label: CONTENT_TYPE_LABELS[filters.contentType],
      });
    if (filters.sector !== "all")
      chips.push({ key: "sector", label: filters.sector });
    if (filters.dateRange !== "all")
      chips.push({
        key: "dateRange",
        label:
          filters.dateRange === "30d" ? "Last 30 days" : "Last 3 months",
      });
    return chips;
  }, [filters]);

  const filtered = useMemo(() => {
    let result = items.filter((item) => {
      if (filters.contentType !== "all" && item.type !== filters.contentType)
        return false;
      if (filters.sector !== "all" && item.sector !== filters.sector)
        return false;
      if (!filterByDate(item.date, filters.dateRange)) return false;
      if (
        query &&
        !`${item.title} ${item.summary} ${item.author}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    });

    if (filters.sort === "az") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sort === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return result;
  }, [items, filters, query]);

  const removeChip = (key: string) => {
    if (key === "contentType") setFilters((f) => ({ ...f, contentType: "all" }));
    if (key === "sector") setFilters((f) => ({ ...f, sector: "all" }));
    if (key === "dateRange") setFilters((f) => ({ ...f, dateRange: "all" }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-midnight">Research Library</h1>
        <p className="mt-2 text-text-muted">
          Browse articles, stock reports, pitch decks, and sector notes.
        </p>
      </div>

      <div className="relative mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            placeholder="Search research…"
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="lg:hidden"
          onClick={() => setMobileFilters(true)}
        >
          Filters
        </Button>
        <div className="hidden gap-1 sm:flex">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            activeChips={activeChips}
            onRemoveChip={removeChip}
          />
        </div>

        {mobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            <div className="h-full w-80 overflow-y-auto bg-background p-6">
              <div className="mb-4 flex justify-between">
                <span className="font-semibold">Filters</span>
                <button type="button" onClick={() => setMobileFilters(false)}>
                  Done
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                activeChips={activeChips}
                onRemoveChip={removeChip}
              />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="mb-4 text-sm text-text-muted">
            {filtered.length} results
          </p>
          <div
            className={
              view === "grid"
                ? "grid gap-4 sm:grid-cols-2"
                : "flex flex-col gap-3"
            }
          >
            {filtered.map((item) => (
              <article
                key={`${item.type}-${item.id}`}
                className="flex flex-col gap-3 border border-border bg-surface p-5 shadow-card sm:flex-row sm:items-center"
              >
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={typeBadgeVariant[item.type]}
                    >
                      {CONTENT_TYPE_LABELS[item.type]}
                    </Badge>
                    <SectorBadge sector={item.sector} />
                    {item.ticker && (
                      <span className="font-mono text-xs font-bold">
                        {item.ticker}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-lg text-midnight">
                    <Link href={item.href}>{item.title}</Link>
                  </h2>
                  <p className="line-clamp-1 text-sm text-text-muted">
                    {item.summary}
                  </p>
                  <p className="text-xs text-text-muted">
                    {item.author} · {formatDate(item.date)}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild className="shrink-0">
                  <Link href={item.href}>View</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
