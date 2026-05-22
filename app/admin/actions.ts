"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminCookieName, isAdminAuthenticated } from "@/lib/admin-auth";
import { uploadFile, type StorageBucket } from "@/lib/storage";
import type {
  ArticlePageMeta,
  AuthorInsert,
  CompanyInsert,
  ReportCategory,
  ReportMetadata,
  ResearchReportInsert,
} from "@/lib/types/database";

async function requireAdmin() {
  if (!isAdminAuthenticated()) {
    throw new Error("Unauthorized");
  }
}

export async function adminLogin(formData: FormData) {
  const secret = formData.get("secret") as string;
  if (secret !== process.env.ADMIN_SECRET) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = cookies();
  cookieStore.set(getAdminCookieName(), secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function adminLogout() {
  const cookieStore = cookies();
  cookieStore.delete(getAdminCookieName());
  redirect("/admin/login");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveReport(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();

  const id = (formData.get("id") as string) || undefined;
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as ReportCategory;
  const sector = formData.get("sector") as string;
  const ticker = (formData.get("ticker") as string) || null;
  const reading_time = (formData.get("reading_time") as string) || null;
  const author_id = (formData.get("author_id") as string) || null;
  const company_id = (formData.get("company_id") as string) || null;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const thumbnail_url = (formData.get("thumbnail_url") as string) || null;
  const pdf_url = (formData.get("pdf_url") as string) || null;

  const metadata: ArticlePageMeta = {};
  const rating = formData.get("rating") as string;
  if (rating) metadata.rating = rating as ReportMetadata["rating"];
  const targetPrice = formData.get("target_price") as string;
  if (targetPrice) metadata.target_price = parseFloat(targetPrice);
  const currentPrice = formData.get("current_price") as string;
  if (currentPrice) metadata.current_price = parseFloat(currentPrice);
  const companyName = formData.get("company_name") as string;
  if (companyName) metadata.company_name = companyName;
  const thesis = formData.get("thesis") as string;
  if (thesis) metadata.thesis = thesis;
  const tagsRaw = formData.get("tags") as string;
  if (tagsRaw) metadata.tags = tagsRaw.split(",").map((t) => t.trim());

  const subtitle = formData.get("subtitle") as string;
  if (subtitle) metadata.subtitle = subtitle;
  const takeawaysRaw = formData.get("key_takeaways") as string;
  if (takeawaysRaw) {
    metadata.key_takeaways = takeawaysRaw
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  let content_blocks: unknown = [];
  const blocksRaw = formData.get("content_blocks") as string;
  if (blocksRaw?.trim()) {
    try {
      content_blocks = JSON.parse(blocksRaw);
    } catch {
      throw new Error("Invalid content_blocks JSON");
    }
  }

  const row: ResearchReportInsert = {
    title,
    slug,
    excerpt,
    content,
    category,
    sector,
    ticker,
    reading_time,
    author_id: author_id || null,
    company_id: company_id || null,
    featured,
    thumbnail_url,
    pdf_url: category === "article" ? null : pdf_url,
    content_blocks,
    metadata,
    published_at: published ? new Date().toISOString() : null,
  };

  if (id) {
    const { error } = await supabase
      .from("research_reports")
      .update(row)
      .eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("research_reports").insert(row);
    if (error) throw error;
  }

  revalidatePath("/");
  revalidatePath("/research");
  redirect("/admin/reports");
}

export async function deleteReport(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const supabase = createAdminClient();
  const { error } = await supabase.from("research_reports").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
  redirect("/admin/reports");
}

export async function saveAuthor(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();

  const id = (formData.get("id") as string) || undefined;
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || slugify(name);
  const row: AuthorInsert = {
    name,
    slug,
    role: (formData.get("role") as string) || null,
    bio: (formData.get("bio") as string) || null,
    initials: (formData.get("initials") as string) || null,
    linkedin_url: (formData.get("linkedin_url") as string) || null,
    avatar_url: (formData.get("avatar_url") as string) || null,
    sector_focus: (formData.get("sector_focus") as string) || null,
  };

  if (id) {
    const { error } = await supabase.from("authors").update(row).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("authors").insert(row);
    if (error) throw error;
  }

  revalidatePath("/about");
  redirect("/admin/authors");
}

export async function deleteAuthor(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const supabase = createAdminClient();
  const { error } = await supabase.from("authors").delete().eq("id", id);
  if (error) throw error;
  redirect("/admin/authors");
}

export async function saveCompany(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminClient();

  const id = (formData.get("id") as string) || undefined;
  const name = formData.get("name") as string;
  const ticker = (formData.get("ticker") as string).toUpperCase();
  const row: CompanyInsert = {
    name,
    ticker,
    sector: (formData.get("sector") as string) || null,
    logo_url: (formData.get("logo_url") as string) || null,
    description: (formData.get("description") as string) || null,
  };

  if (id) {
    const { error } = await supabase.from("companies").update(row).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("companies").insert(row);
    if (error) throw error;
  }

  redirect("/admin/companies");
}

export async function deleteCompany(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const supabase = createAdminClient();
  const { error } = await supabase.from("companies").delete().eq("id", id);
  if (error) throw error;
  redirect("/admin/companies");
}

export async function uploadAdminFile(formData: FormData) {
  await requireAdmin();
  const bucket = formData.get("bucket") as StorageBucket;
  const file = formData.get("file") as File;
  if (!file?.size) return { error: "No file" };

  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const url = await uploadFile(bucket, path, file);
  return { url };
}
