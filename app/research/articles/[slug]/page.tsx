import { notFound } from "next/navigation";
import { ArticleDetailView } from "@/components/articles/ArticleDetailView";
import { getArticleBySlug } from "@/lib/queries/articles";
import { getPublishedReports } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const result = await getArticleBySlug(params.slug);
  return { title: result?.item.title ?? "Article" };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const result = await getArticleBySlug(params.slug);
  if (!result) notFound();

  const allArticles = await getPublishedReports({ category: "article" });
  const related = allArticles
    .filter((a) => a.slug !== result.item.slug)
    .slice(0, 3);

  return (
    <ArticleDetailView
      article={result.item}
      context={result.renderContext}
      related={related}
    />
  );
}
