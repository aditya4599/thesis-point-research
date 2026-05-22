"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { SECTORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ContentType, Sector } from "@/lib/types";

export interface FilterState {
  contentType: ContentType | "all";
  sector: Sector | "all";
  dateRange: "30d" | "3m" | "all";
  sort: "newest" | "popular" | "az";
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  activeChips: { key: string; label: string }[];
  onRemoveChip: (key: string) => void;
  className?: string;
}

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        className="flex w-full items-center justify-between text-sm font-semibold text-midnight"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          className={cn("h-4 w-4 transition", open && "rotate-180")}
        />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  filters,
  onChange,
  activeChips,
  onRemoveChip,
  className,
}: FilterSidebarProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <aside className={cn("w-full shrink-0 lg:w-64", className)}>
      {activeChips.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => onRemoveChip(chip.key)}
              className="inline-flex items-center gap-1 border border-border bg-background px-2 py-1 text-xs text-text-primary hover:bg-surface"
            >
              {chip.label}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}

      <FilterGroup title="Content Type">
        {[
          ["all", "All"],
          ["article", "Articles"],
          ["stock-report", "Stock Reports"],
          ["pitch", "Pitch Decks"],
          ["sector-note", "Sector Notes"],
        ].map(([value, label]) => (
          <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="contentType"
              checked={filters.contentType === value}
              onChange={() =>
                set("contentType", value as FilterState["contentType"])
              }
              className="accent-midnight"
            />
            {label}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Sector">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            name="sector"
            checked={filters.sector === "all"}
            onChange={() => set("sector", "all")}
            className="accent-midnight"
          />
          All Sectors
        </label>
        {SECTORS.map((s) => (
          <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="sector"
              checked={filters.sector === s}
              onChange={() => set("sector", s)}
              className="accent-midnight"
            />
            {s}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Date Range">
        {[
          ["30d", "Last 30 days"],
          ["3m", "Last 3 months"],
          ["all", "All Time"],
        ].map(([value, label]) => (
          <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="dateRange"
              checked={filters.dateRange === value}
              onChange={() =>
                set("dateRange", value as FilterState["dateRange"])
              }
              className="accent-midnight"
            />
            {label}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Sort">
        {[
          ["newest", "Newest"],
          ["popular", "Most Read"],
          ["az", "A–Z"],
        ].map(([value, label]) => (
          <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="sort"
              checked={filters.sort === value}
              onChange={() => set("sort", value as FilterState["sort"])}
              className="accent-midnight"
            />
            {label}
          </label>
        ))}
      </FilterGroup>
    </aside>
  );
}
