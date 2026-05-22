import type { ResearchItem } from "@/lib/types";
import type { Article, Pitch, StockReport } from "@/lib/types";

export function toArticle(item: ResearchItem): Article {
  const tags = item.metadata?.tags ?? [];
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.summary,
    sector: item.sector,
    author: item.author,
    date: item.date,
    readTime: item.readingTime ?? "5 min",
    tags,
    featured: item.featured,
  };
}

export function toStockReport(item: ResearchItem): StockReport {
  const meta = item.metadata ?? {};
  return {
    id: item.id,
    slug: item.slug,
    ticker: item.ticker ?? "",
    company: meta.company_name ?? item.companyData?.name ?? item.title,
    rating: meta.rating ?? "HOLD",
    targetPrice: meta.target_price ?? 0,
    currentPrice: meta.current_price ?? 0,
    sector: item.sector,
    analyst: item.author,
    date: item.date,
    summary: item.summary,
    pdfUrl: item.pdfUrl ?? "",
    featured: item.featured,
  };
}

export function toPitch(item: ResearchItem): Pitch {
  const meta = item.metadata ?? {};
  return {
    id: item.id,
    slug: item.slug,
    company: meta.company_name ?? item.companyData?.name ?? item.title,
    ticker: item.ticker ?? "",
    sector: item.sector,
    thesis: meta.thesis ?? item.summary,
    analyst: item.author,
    date: item.date,
    pdfUrl: item.pdfUrl ?? "",
    coverImage: item.thumbnailUrl,
    featured: item.featured,
  };
}
