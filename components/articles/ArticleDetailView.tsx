import Image from "next/image";
import Link from "next/link";

import { AuthorCard } from "@/components/AuthorCard";
import { ContentCard } from "@/components/ContentCard";
import { NewsletterBanner } from "@/components/NewsletterBanner";
import { RenderBlocks } from "@/components/RenderBlocks";
import { SectorBadge } from "@/components/SectorBadge";
import { ShareButton } from "@/components/ShareButton";

import { toArticle } from "@/lib/adapters";

import type { ArticleRenderContext } from "@/lib/content/resolve-article-blocks";
import type { ResearchItem } from "@/lib/types";

import { formatDate } from "@/lib/utils";

interface ArticleDetailViewProps {
  article: ResearchItem;
  context: ArticleRenderContext;
  related: ResearchItem[];
}

export function ArticleDetailView({
  article,
  context,
  related,
}: ArticleDetailViewProps) {
  const heroImage =
    context.heroImageUrl ??
    article.thumbnailUrl;

  return (
    <>
      {/* HERO */}
      <header className="border-b border-border bg-[#f5f1ea]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">
            <nav
              className="flex items-center gap-2 text-sm text-slate-500"
              aria-label="Breadcrumb"
            >
              <Link
                href="/research"
                className="hover:text-midnight"
              >
                Research
              </Link>

              <span>/</span>

              <Link
                href="/research/articles"
                className="hover:text-midnight"
              >
                Articles
              </Link>

              <span>/</span>

              <span>{article.sector}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SectorBadge sector={article.sector} />

              {context.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-8 font-serif text-5xl leading-tight text-midnight">
              {context.title}
            </h1>

            {context.subtitle && (
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                {context.subtitle}
              </p>
            )}

            <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
              <span className="font-medium text-midnight">
                {article.author}
              </span>

              <span>•</span>

              <time dateTime={article.date}>
                {formatDate(article.date)}
              </time>

              {article.readingTime && (
                <>
                  <span>•</span>

                  <span>{article.readingTime}</span>
                </>
              )}
            </div>
          </div>

          {/* HERO IMAGE */}
          {heroImage && (
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={heroImage}
                alt={context.title}
                width={1200}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* ARTICLE */}
          <article className="min-w-0">

            {/* KEY TAKEAWAYS */}
            {context.keyTakeaways &&
              context.keyTakeaways.length > 0 && (
                <section className="mb-14 rounded-3xl bg-[#f5f1ea] p-10">
                  <h2 className="mb-8 font-serif text-4xl text-midnight">
                    Key takeaways
                  </h2>

                  <div className="space-y-5">
                    {context.keyTakeaways.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex gap-4"
                        >
                          <span className="mt-3 h-2 w-2 rounded-full bg-amber-600" />

                          <p className="text-lg leading-8 text-slate-700">
                            {item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}

            {/* BLOCK RENDERER */}
            <RenderBlocks
              blocks={context.blocks}
              skipHero={Boolean(heroImage)}
            />

            {/* SHARE */}
            <div className="mt-14 flex items-center gap-4 border-t border-border pt-8">
              <span className="text-sm text-text-muted">
                Share
              </span>

              <ShareButton
                title={context.title}
                summary={context.excerpt ?? ""}
              />
            </div>

            {/* AUTHOR */}
            {article.authorData && (
              <div className="mt-16 border-t border-border pt-12">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  About the author
                </p>

                <AuthorCard
                  author={article.authorData}
                />
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">

            {/* SUMMARY */}
            {context.excerpt && (
              <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Summary
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {context.excerpt}
                </p>
              </div>
            )}

            {/* NEWSLETTER */}
            <NewsletterBanner compact />
          </aside>
        </div>

        {/* RELATED ARTICLES */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-border pt-14">
            <h2 className="font-serif text-3xl text-midnight">
              You may also like
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ContentCard
                  key={a.id}
                  type="article"
                  data={toArticle(a)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}