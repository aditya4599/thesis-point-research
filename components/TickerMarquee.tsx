"use client";

import { useEffect, useState } from "react";

type Stock = {
  symbol: string;
  price: number;
  percent_change: number;
};

type MarketQuote = {
  symbol: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
};

export function TickerMarquee() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  async function fetchStocks() {
    try {
      const res = await fetch("/api/market");

      const data = await res.json();

      if (!Array.isArray(data)) {
        console.error("Invalid market data:", data);
        return;
      }

      const results = (data as MarketQuote[])
        .filter(
          (item) =>
            item.regularMarketPrice &&
            item.regularMarketPrice > 0
        )
        .map((item) => ({
          symbol: item.symbol,
          price: Number(item.regularMarketPrice),
          percent_change: Number(
            item.regularMarketChangePercent || 0
          ),
        }));

      setStocks(results);
    } catch (error) {
      console.error("Ticker fetch failed:", error);
    }
  }

  useEffect(() => {
    fetchStocks();

    const interval = setInterval(fetchStocks, 30000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    ...stocks,
    ...stocks,
    ...stocks,
    ...stocks,
  ];

  return (
    <div className="overflow-hidden border-t border-white/10 bg-midnight/80 py-2">
      <div className="flex min-w-max animate-marquee gap-6 whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((t, i) => {
          const cleanSymbol = t.symbol
            .replace(".NS", "")
            .replace(".BSE", "");

          const isIndian = [
            "RELIANCE",
            "INFY",
            "TCS",
            "HDFCBANK",
            "ICICIBANK",
          ].includes(cleanSymbol);

          return (
            <span
              key={`${t.symbol}-${i}`}
              className="inline-flex items-center gap-3 text-sm text-slate-300"
            >
              <span className="font-semibold text-white">
                {cleanSymbol}
              </span>

              <span>
                {isIndian ? "₹" : "$"}
                {t.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>

              <span
                className={
                  t.percent_change >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                }
              >
                {t.percent_change.toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}