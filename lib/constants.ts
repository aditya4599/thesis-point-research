import type { Sector } from "./types";

export const SECTORS: Sector[] = [
  "Technology",
  "Healthcare",
  "Financials",
  "Energy",
  "Consumer",
  "Industrials",
  "Macro",
];

export const SECTOR_COLORS: Record<Sector, string> = {
  Technology: "bg-blue-100 text-blue-800 border-blue-200",
  Healthcare: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Financials: "bg-amber-100 text-amber-900 border-amber-200",
  Energy: "bg-orange-100 text-orange-800 border-orange-200",
  Consumer: "bg-purple-100 text-purple-800 border-purple-200",
  Industrials: "bg-slate-100 text-slate-800 border-slate-200",
  Macro: "bg-rose-100 text-rose-800 border-rose-200",
};

export const CONTENT_TYPE_LABELS = {
  article: "Article",
  "stock-report": "Stock Report",
  pitch: "Pitch Deck",
  "sector-note": "Sector Note",
} as const;

export const TICKER_SYMBOLS = [
  { symbol: "AAPL", price: 189.42, change: "+1.2%" },
  { symbol: "MSFT", price: 415.28, change: "+0.8%" },
  { symbol: "HDFCB", price: 1520.0, change: "-0.4%" },
  { symbol: "RELIANCE", price: 2845.5, change: "+0.3%" },
  { symbol: "ZOMATO", price: 198.75, change: "+2.1%" },
  { symbol: "NVDA", price: 892.1, change: "+1.9%" },
  { symbol: "TCS", price: 3890.0, change: "-0.2%" },
  { symbol: "INFY", price: 1562.4, change: "+0.5%" },
];
