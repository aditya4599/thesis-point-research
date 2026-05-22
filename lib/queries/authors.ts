import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { AuthorRow } from "@/lib/types/database";

export async function getAuthors() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as AuthorRow[];
}

export async function getAuthorBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data as AuthorRow | null;
}

export async function getAllAuthorsAdmin() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as AuthorRow[];
}
