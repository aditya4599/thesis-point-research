import { HeroBlock } from "@/components/blocks/HeroBlock";
import { ParagraphBlock } from "@/components/blocks/ParagraphBlock";
import { TakeawaysBlock } from "@/components/blocks/TakeawaysBlock";
import { QuoteBlock } from "@/components/blocks/QuoteBlock";
import { ImageBlock } from "@/components/blocks/ImageBlock";
import { SectionBlock } from "@/components/blocks/SectionBlock";
import type { ContentBlock } from "@/lib/types/blocks";

interface RenderBlocksProps {
  blocks: ContentBlock[];
  /** Skip hero blocks when page chrome already renders hero */
  skipHero?: boolean;
  className?: string;
}

/**
 * Modular block renderer for article webpage content.
 * Extend the switch when new block types are added to the CMS.
 */
export function RenderBlocks({
  blocks,
  skipHero = false,
  className,
}: RenderBlocksProps) {
  const visible = skipHero
    ? blocks.filter((b) => b.type !== "hero")
    : blocks;

  return (
    <div className={className ?? "article-blocks"}>
      {visible.map((block, index) => (
        <BlockNode key={block.id ?? `${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function BlockNode({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock data={block.data} />;
    case "paragraph":
      return <ParagraphBlock data={block.data} />;
    case "takeaways":
      return <TakeawaysBlock data={block.data} />;
    case "quote":
      return <QuoteBlock data={block.data} />;
    case "image":
      return <ImageBlock data={block.data} />;
    case "section":
      return <SectionBlock data={block.data} />;
    default:
      return null;
  }
}
