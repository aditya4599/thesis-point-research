type Block =
  | {
      type: "paragraph";
      data: {
        content: string;
      };
    }
  | {
      type: "heading";
      data: {
        text: string;
      };
    }
  | {
      type: "quote";
      data: {
        quote: string;
        author?: string;
      };
    }
  | {
      type: "key_takeaways";
      data: {
        items: string[];
      };
    }
  | {
      type: "image";
      data: {
        url: string;
        caption?: string;
      };
    };

export function ArticleRenderer({
  blocks,
}: {
  blocks: Block[];
}) {
  return (
    <div className="space-y-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="font-serif text-4xl text-midnight"
              >
                {block.data.text}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg leading-9 text-slate-700"
              >
                {block.data.content}
              </p>
            );

          case "quote":
            return (
              <div
                key={index}
                className="border-l-4 border-amber-500 pl-6 py-4"
              >
                <p className="font-serif text-3xl italic leading-relaxed text-slate-800">
                  &quot;{block.data.quote}&quot;
                </p>

                {block.data.author && (
                  <p className="mt-4 text-sm text-slate-500">
                    {block.data.author}
                  </p>
                )}
              </div>
            );

          case "key_takeaways":
            return (
              <div
                key={index}
                className="rounded-2xl bg-stone-100 p-10"
              >
                <h3 className="mb-6 font-serif text-3xl">
                  Key takeaways
                </h3>

                <ul className="space-y-4">
                  {block.data.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-lg text-slate-700"
                    >
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "image":
            return (
              <div key={index}>
                <img
                  src={block.data.url}
                  alt={block.data.caption || "Article image"}
                  className="w-full rounded-2xl"
                />

                {block.data.caption && (
                  <p className="mt-3 text-sm text-slate-500">
                    {block.data.caption}
                  </p>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}