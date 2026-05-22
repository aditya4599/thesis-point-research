import { notFound } from "next/navigation";
import { StockReportDetailView } from "@/components/stock-reports/StockReportDetailView";
import { getStockReportBySlug } from "@/lib/queries/stock-reports";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const result = await getStockReportBySlug(params.slug);
  return {
    title: result
      ? `${result.report.company} (${result.report.ticker})`
      : "Stock Report",
  };
}

export default async function StockReportDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const result = await getStockReportBySlug(params.slug);
  if (!result) notFound();

  return (
    <StockReportDetailView item={result.item} report={result.report} />
  );
}
