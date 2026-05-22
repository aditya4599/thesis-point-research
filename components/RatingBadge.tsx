import { cn } from "@/lib/utils";
import type { Rating } from "@/lib/types";

const styles: Record<Rating, string> = {
  BUY: "bg-emerald-100 text-emerald-800 border-emerald-300",
  HOLD: "bg-amber-100 text-amber-900 border-amber-300",
  SELL: "bg-red-100 text-red-800 border-red-300",
};

export function RatingBadge({ rating }: { rating: Rating }) {
  return (
    <span
      className={cn(
        "inline-flex border px-2 py-0.5 text-xs font-bold tracking-wider",
        styles[rating]
      )}
    >
      {rating}
    </span>
  );
}
