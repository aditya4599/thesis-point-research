/**
 * Full seed script — run with: npx tsx scripts/seed-from-json.ts
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const root = path.join(__dirname, "..");

function loadJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(root, "data", file), "utf-8"));
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const team = loadJson<
    { name: string; title: string; designation?: string; sectorFocus: string; bio: string; linkedin?: string }[]
  >("team.json");

  const authorMap: Record<string, string> = {};
  for (const m of team) {
    const slug = slugify(m.name);
    const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
    const { data } = await supabase
      .from("authors")
      .upsert(
        {
          name: m.name,
          slug,
          role: m.title,
          bio: m.bio,
          initials,
          linkedin_url: m.linkedin,
          sector_focus: m.sectorFocus,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();
    if (data) authorMap[m.name] = data.id;
  }

  const stockReports = loadJson<
    {
      slug: string;
      title?: string;
      company: string;
      ticker: string;
      rating: string;
      targetPrice: number;
      currentPrice: number;
      sector: string;
      analyst: string;
      date: string;
      summary: string;
      pdfUrl?: string;
      featured?: boolean;
    }[]
  >("stockReports.json");

  for (const r of stockReports) {
    await supabase.from("companies").upsert(
      { name: r.company, ticker: r.ticker, sector: r.sector },
      { onConflict: "ticker" }
    );
    const { data: co } = await supabase
      .from("companies")
      .select("id")
      .eq("ticker", r.ticker)
      .single();

    await supabase.from("research_reports").upsert(
      {
        title: `${r.company} (${r.ticker})`,
        slug: r.slug,
        excerpt: r.summary,
        category: "stock-report",
        sector: r.sector,
        ticker: r.ticker,
        published_at: r.date,
        featured: r.featured ?? false,
        author_id: authorMap[r.analyst],
        company_id: co?.id,
        pdf_url: r.pdfUrl,
        metadata: {
          rating: r.rating,
          target_price: r.targetPrice,
          current_price: r.currentPrice,
          company_name: r.company,
        },
      },
      { onConflict: "slug" }
    );
  }

  const articles = loadJson<
    {
      slug: string;
      title: string;
      excerpt: string;
      sector: string;
      author: string;
      date: string;
      readTime: string;
      tags: string[];
      featured?: boolean;
    }[]
  >("articles.json");

  for (const a of articles) {
    await supabase.from("research_reports").upsert(
      {
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        category: "article",
        sector: a.sector,
        reading_time: a.readTime,
        published_at: a.date,
        featured: a.featured ?? false,
        author_id: authorMap[a.author],
        metadata: { tags: a.tags },
      },
      { onConflict: "slug" }
    );
  }

  const pitches = loadJson<
    {
      slug: string;
      company: string;
      ticker: string;
      sector: string;
      thesis: string;
      analyst: string;
      date: string;
      pdfUrl?: string;
      featured?: boolean;
    }[]
  >("pitches.json");

  for (const p of pitches) {
    await supabase.from("companies").upsert(
      { name: p.company, ticker: p.ticker, sector: p.sector },
      { onConflict: "ticker" }
    );
    const { data: co } = await supabase
      .from("companies")
      .select("id")
      .eq("ticker", p.ticker)
      .single();

    await supabase.from("research_reports").upsert(
      {
        title: `${p.company} Pitch Deck`,
        slug: p.slug,
        excerpt: p.thesis,
        category: "pitch",
        sector: p.sector,
        ticker: p.ticker,
        published_at: p.date,
        featured: p.featured ?? false,
        author_id: authorMap[p.analyst],
        company_id: co?.id,
        pdf_url: p.pdfUrl,
        metadata: { company_name: p.company, thesis: p.thesis },
      },
      { onConflict: "slug" }
    );
  }

  const sectorNotes = loadJson<
    {
      slug: string;
      title: string;
      sector: string;
      analyst: string;
      date: string;
      preview: string;
    }[]
  >("sectorNotes.json");

  for (const n of sectorNotes) {
    await supabase.from("research_reports").upsert(
      {
        title: n.title,
        slug: n.slug,
        excerpt: n.preview,
        category: "sector-note",
        sector: n.sector,
        published_at: n.date,
        author_id: authorMap[n.analyst],
      },
      { onConflict: "slug" }
    );
  }

  console.log("Seed complete.");
}

main().catch(console.error);
