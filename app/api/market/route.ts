import { NextResponse } from "next/server";

const usSymbols = [
  "AAPL",
  "MSFT",
  "NVDA",
  "TSLA",
  "GOOGL",
  "AMZN",
  "META",
];

const indianSymbols = [
  "RELIANCE",
  "INFY",
  "TCS",
  "HDFCBANK",
  "ICICIBANK",
];

export async function GET() {
  try {
    const finnhubKey = process.env.FINNHUB_API_KEY;
    const twelveKey = process.env.TWELVEDATA_API_KEY;

    // ===== US STOCKS =====
    const usResults = await Promise.all(
      usSymbols.map(async (symbol) => {
        try {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubKey}`,
            {
              cache: "no-store",
            }
          );

          const data = await res.json();

          return {
            symbol,
            regularMarketPrice: Number(data.c || 0),
            regularMarketChangePercent: Number(
              data.dp || 0
            ),
          };
        } catch {
          return null;
        }
      })
    );

    // ===== INDIAN STOCKS =====
    const indianResults = await Promise.all(
      indianSymbols.map(async (symbol) => {
        try {
          const res = await fetch(
            `https://api.twelvedata.com/quote?symbol=${symbol}&exchange=NSE&apikey=${twelveKey}`,
            {
              cache: "no-store",
            }
          );

          const data = await res.json();

          return {
            symbol,
            regularMarketPrice: Number(data.close || 0),
            regularMarketChangePercent: Number(
              data.percent_change || 0
            ),
          };
        } catch {
          return null;
        }
      })
    );

    const allStocks = [
      ...usResults,
      ...indianResults,
    ].filter(
      (item) =>
        item &&
        item.regularMarketPrice > 0
    );

    return NextResponse.json(allStocks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch market data",
      },
      { status: 500 }
    );
  }
}