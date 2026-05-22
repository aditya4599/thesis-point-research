import { createClient } from "@/lib/supabase/server";
import { toResearchItem } from "@/lib/queries/reports";
import { toStockReport } from "@/lib/adapters";
import type { ResearchReportRow } from "@/lib/types/database";

const REPORT_SELECT = `
  *,
  authors (*),
  companies (*)
`;

export async function getStockReportBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("research_reports")
    .select(REPORT_SELECT)
    .eq("slug", slug)
    .eq("category", "stock-report")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as ResearchReportRow;
  const item = toResearchItem(row);
  const report = toStockReport(item);

  return { item, report, row };
}
