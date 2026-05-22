import { createClient } from "@/lib/supabase/server";
import { toResearchItem } from "@/lib/queries/reports";
import { resolveArticleBlocks } from "@/lib/content/resolve-article-blocks";
import type { ResearchReportRow } from "@/lib/types/database";

const ARTICLE_SELECT = `
  *,
  authors (*),
  companies (*)
`;

export async function getArticleBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("research_reports")
    .select(ARTICLE_SELECT)
    .eq("slug", slug)
    .eq("category", "article")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as ResearchReportRow;
  const item = toResearchItem(row);
  const renderContext = resolveArticleBlocks(item, row.content_blocks);

  return { item, renderContext, row };
}
