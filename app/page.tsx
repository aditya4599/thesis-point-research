import { HomePageContent } from "@/components/HomePageContent";
import { getCategoryCounts, getPublishedReports } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredItems, latestItems, counts] = await Promise.all([
    getPublishedReports({ featured: true, limit: 4 }),
    getPublishedReports({ limit: 6 }),
    getCategoryCounts(),
  ]);

  const featured = featuredItems.filter(
    (i) => i.type === "article" || i.type === "stock-report"
  );
  const latest = latestItems.slice(0, 6);

  return <HomePageContent featured={featured} latest={latest} counts={counts} />;
}
