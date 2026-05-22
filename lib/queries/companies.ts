import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CompanyRow } from "@/lib/types/database";

export async function getCompanies() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as CompanyRow[];
}

export async function getCompanyByTicker(ticker: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("ticker", ticker.toUpperCase())
    .maybeSingle();

  if (error) throw error;
  return data as CompanyRow | null;
}

export async function getAllCompaniesAdmin() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("name");

  if (error) throw error;
  return data as CompanyRow[];
}
