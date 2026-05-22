import type { ParagraphBlockData } from "@/lib/types/blocks";

export function ParagraphBlock({ data }: { data: ParagraphBlockData }) {
  if (data.html) {
    return (
      <div
        className="article-block-paragraph prose-article"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    );
  }

  if (!data.text) return null;

  return <p className="article-block-paragraph">{data.text}</p>;
}
