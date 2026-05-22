/**
 * Modular content block types for article webpage rendering.
 * Stored in research_reports.content_blocks (JSONB).
 */

export type BlockType =
  | "hero"
  | "paragraph"
  | "takeaways"
  | "quote"
  | "image"
  | "section";

export interface HeroBlockData {
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface ParagraphBlockData {
  /** Plain text paragraph */
  text?: string;
  /** Rich HTML (sanitized server-side in CMS) */
  html?: string;
}

export interface TakeawaysBlockData {
  title?: string;
  items: string[];
}

export interface QuoteBlockData {
  text: string;
  attribution?: string;
}

export interface ImageBlockData {
  url: string;
  alt?: string;
  caption?: string;
}

export interface SectionBlockData {
  heading: string;
  /** Semantic heading level for hierarchy */
  level?: 2 | 3;
}

export type ContentBlock =
  | { id?: string; type: "hero"; data: HeroBlockData }
  | { id?: string; type: "paragraph"; data: ParagraphBlockData }
  | { id?: string; type: "takeaways"; data: TakeawaysBlockData }
  | { id?: string; type: "quote"; data: QuoteBlockData }
  | { id?: string; type: "image"; data: ImageBlockData }
  | { id?: string; type: "section"; data: SectionBlockData };

export function isContentBlock(value: unknown): value is ContentBlock {
  if (!value || typeof value !== "object") return false;
  const block = value as ContentBlock;
  const types: BlockType[] = [
    "hero",
    "paragraph",
    "takeaways",
    "quote",
    "image",
    "section",
  ];
  return types.includes(block.type as BlockType) && block.data != null;
}

export function parseContentBlocks(raw: unknown): ContentBlock[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isContentBlock);
}
