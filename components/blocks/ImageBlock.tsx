import Image from "next/image";
import type { ImageBlockData } from "@/lib/types/blocks";

export function ImageBlock({ data }: { data: ImageBlockData }) {
  if (!data.url) return null;

  return (
    <figure className="article-block-image">
      <Image
        src={data.url}
        alt={data.alt ?? ""}
        width={960}
        height={540}
        className="article-inline-image"
      />
      {data.caption && (
        <figcaption className="article-image-caption">{data.caption}</figcaption>
      )}
    </figure>
  );
}
