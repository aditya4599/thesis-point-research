import { StockReportsList } from "@/components/StockReportsList";
import { toStockReport } from "@/lib/adapters";
import { getPublishedReports } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stock Reports",
};

export default async function StockReportsPage() {
  const items = await getPublishedReports({ category: "stock-report" });
  const reports = items.map(toStockReport);
  return <StockReportsList reports={reports} />;
}
