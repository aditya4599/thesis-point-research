import type { ResearchItem } from "@/lib/types";
import type { ContentBlock } from "@/lib/types/blocks";
import { parseContentBlocks } from "@/lib/types/blocks";
import type { ArticlePageMeta } from "@/lib/types/database";

export interface ArticleRenderContext {
  title: string;
  excerpt: string;
  subtitle?: string;
  heroImageUrl?: string;
  keyTakeaways?: string[];
  tags: string[];
  blocks: ContentBlock[];
}

/**
 * Resolves article body blocks from content_blocks, with legacy fallbacks
 * from content (HTML), excerpt, thumbnail_url, and metadata.
 */
export function resolveArticleBlocks(
  article: ResearchItem,
  contentBlocksRaw?: unknown
): ArticleRenderContext {
  const meta = (article.metadata ?? {}) as ArticlePageMeta;
  const parsed = parseContentBlocks(contentBlocksRaw);

  if (parsed.length > 0) {
    return {
      title: article.title,
      excerpt: article.summary,
      subtitle: meta.subtitle,
      heroImageUrl: article.thumbnailUrl ?? meta.hero_image_url,
      keyTakeaways: meta.key_takeaways,
      tags: meta.tags ?? [],
      blocks: parsed,
    };
  }

  const blocks: ContentBlock[] = [];

  const heroImage = article.thumbnailUrl ?? meta.hero_image_url;
  if (heroImage || meta.subtitle || article.summary) {
    blocks.push({
      type: "hero",
      data: {
        subtitle: meta.subtitle ?? article.summary,
        imageUrl: heroImage,
        imageAlt: article.title,
      },
    });
  }

  if (meta.key_takeaways?.length) {
    blocks.push({
      type: "takeaways",
      data: {
        title: "Key takeaways",
        items: meta.key_takeaways,
      },
    });
  }

  if (article.content?.trim()) {
    blocks.push({
      type: "paragraph",
      data: { html: article.content },
    });
  } else if (article.summary) {
    blocks.push({
      type: "paragraph",
      data: { text: article.summary },
    });
  }

  return {
    title: article.title,
    excerpt: article.summary,
    subtitle: meta.subtitle,
    heroImageUrl: heroImage,
    keyTakeaways: meta.key_takeaways,
    tags: meta.tags ?? [],
    blocks,
  };
}
