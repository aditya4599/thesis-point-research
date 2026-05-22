import Image from "next/image";
import type { HeroBlockData } from "@/lib/types/blocks";

interface HeroBlockProps {
  data: HeroBlockData;
  /** Page-level title shown above subtitle when not in page chrome */
  showInline?: boolean;
}

export function HeroBlock({ data, showInline = false }: HeroBlockProps) {
  if (!data.imageUrl && !data.subtitle) return null;

  return (
    <div className={showInline ? "article-block-hero-inline" : "article-block-hero"}>
      {data.imageUrl && (
        <div className="article-hero-image-wrap">
          <Image
            src={data.imageUrl}
            alt={data.imageAlt ?? ""}
            width={1280}
            height={720}
            className="article-hero-image"
            priority
          />
        </div>
      )}
      {data.subtitle && (
        <p className="article-hero-subtitle">{data.subtitle}</p>
      )}
    </div>
  );
}
