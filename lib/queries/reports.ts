import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseContentBlocks } from "@/lib/types/blocks";
import type {
  ReportCategory,
  ResearchReportRow,
  ReportMetadata,
} from "@/lib/types/database";
import type { ResearchItem } from "@/lib/types";

const REPORT_SELECT = `
  *,
  authors (*),
  companies (*)
`;

function categoryHref(category: ReportCategory, slug: string) {
  const map: Record<ReportCategory, string> = {
    article: `/research/articles/${slug}`,
    "stock-report": `/research/stock-reports/${slug}`,
    pitch: `/research/pitches/${slug}`,
    "sector-note": `/research/sector-notes/${slug}`,
  };
  return map[category];
}

export function toResearchItem(row: ResearchReportRow): ResearchItem {
  const meta = (row.metadata ?? {}) as ReportMetadata;
  const companyName = meta.company_name ?? row.companies?.name;
  const authorName = row.authors?.name ?? "ThesisPoint Research";

  let title = row.title;
  if (row.category === "stock-report" && companyName && row.ticker) {
    title = `${companyName} (${row.ticker})`;
  } else if (row.category === "pitch" && companyName) {
    title = `${companyName} Pitch Deck`;
  }

  return {
    id: row.id,
    slug: row.slug,
    type: row.category,
    title,
    date: row.published_at ?? row.created_at,
    author: authorName,
    summary: row.excerpt ?? "",
    sector: (row.sector as ResearchItem["sector"]) ?? "Macro",
    href: categoryHref(row.category, row.slug),
    ticker: row.ticker ?? undefined,
    rating: meta.rating,
    featured: row.featured,
    thumbnailUrl: row.thumbnail_url ?? undefined,
    readingTime: row.reading_time ?? undefined,
    pdfUrl: row.pdf_url ?? undefined,
    content: row.content ?? undefined,
    contentBlocks: parseContentBlocks(row.content_blocks),
    metadata: meta,
    authorData: row.authors ?? undefined,
    companyData: row.companies ?? undefined,
  };
}

export async function getPublishedReports(options?: {
  category?: ReportCategory;
  featured?: boolean;
  limit?: number;
}) {
  const supabase = createClient();
  let query = supabase
    .from("research_reports")
    .select(REPORT_SELECT)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.featured) {
    query = query.eq("featured", true);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as ResearchReportRow[]).map(toResearchItem);
}

export async function getReportBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("research_reports")
    .select(REPORT_SELECT)
    .eq("slug", slug)
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return toResearchItem(data as ResearchReportRow);
}

export async function getReportBySlugAdmin(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("research_reports")
    .select(REPORT_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as ResearchReportRow | null;
}

export async function getAllResearchItems(): Promise<ResearchItem[]> {
  return getPublishedReports();
}

export async function getCategoryCounts(): Promise<{
  articles: number;
  reports: number;
  pitches: number;
  sectorNotes: number;
}> {
  const supabase = createClient();
  const categories: ReportCategory[] = [
    "article",
    "stock-report",
    "pitch",
    "sector-note",
  ];

  const counts = {
    articles: 0,
    reports: 0,
    pitches: 0,
    sectorNotes: 0,
  };

  for (const cat of categories) {
    const { count, error } = await supabase
      .from("research_reports")
      .select("*", { count: "exact", head: true })
      .eq("category", cat)
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString());

    if (error) throw error;
    if (cat === "article") counts.articles = count ?? 0;
    if (cat === "stock-report") counts.reports = count ?? 0;
    if (cat === "pitch") counts.pitches = count ?? 0;
    if (cat === "sector-note") counts.sectorNotes = count ?? 0;
  }

  return counts;
}

export async function getAllReportsAdmin() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("research_reports")
    .select(`${REPORT_SELECT}`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as ResearchReportRow[];
}

export async function getReportByIdAdmin(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("research_reports")
    .select(REPORT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as ResearchReportRow | null;
}
