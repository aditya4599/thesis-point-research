import { SECTOR_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Sector } from "@/lib/types";

export function SectorBadge({ sector }: { sector: Sector }) {
  return (
    <span
      className={cn(
        "inline-flex border px-2 py-0.5 text-xs font-medium",
        SECTOR_COLORS[sector]
      )}
    >
      {sector}
    </span>
  );
}
