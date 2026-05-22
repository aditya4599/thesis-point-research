import type { TakeawaysBlockData } from "@/lib/types/blocks";

export function TakeawaysBlock({ data }: { data: TakeawaysBlockData }) {
  if (!data.items?.length) return null;

  return (
    <aside className="article-block-takeaways" aria-label="Key takeaways">
      <h2 className="article-takeaways-title">
        {data.title ?? "Key takeaways"}
      </h2>
      <ul className="article-takeaways-list">
        {data.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
