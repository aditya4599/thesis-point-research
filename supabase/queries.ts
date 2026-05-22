import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function getFeaturedReports() {
  const { data, error } = await supabase
    .from("research_reports")
    .select(`
      *,
      authors(*),
      companies(*)
    `)
    .eq("featured", true)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getReportsByCategory(
  category: string
) {
  const { data, error } = await supabase
    .from("research_reports")
    .select(`
      *,
      authors(*),
      companies(*)
    `)
    .eq("category", category)
    .order("published_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}