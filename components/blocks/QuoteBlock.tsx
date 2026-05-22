import type { QuoteBlockData } from "@/lib/types/blocks";

export function QuoteBlock({ data }: { data: QuoteBlockData }) {
  if (!data.text) return null;

  return (
    <blockquote className="article-block-quote">
      <p className="article-quote-text">&ldquo;{data.text}&rdquo;</p>
      {data.attribution && (
        <footer className="article-quote-attribution">— {data.attribution}</footer>
      )}
    </blockquote>
  );
}
