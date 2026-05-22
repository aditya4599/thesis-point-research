import { ContentCard } from "@/components/ContentCard";
import { toArticle } from "@/lib/adapters";
import { getPublishedReports } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Articles",
};

export default async function ArticlesPage() {
  const items = await getPublishedReports({ category: "article" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-midnight">Market Articles</h1>
      <p className="mt-2 text-text-muted">
        Thematic commentary, macro perspectives, and sector insights.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ContentCard key={item.id} type="article" data={toArticle(item)} />
        ))}
      </div>
    </div>
  );
}
