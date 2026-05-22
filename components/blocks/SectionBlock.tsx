import type { SectionBlockData } from "@/lib/types/blocks";

export function SectionBlock({ data }: { data: SectionBlockData }) {
  const level = data.level ?? 2;
  const className =
    level === 3 ? "article-section-heading-sm" : "article-section-heading";

  if (level === 3) {
    return <h3 className={className}>{data.heading}</h3>;
  }

  return <h2 className={className}>{data.heading}</h2>;
}
