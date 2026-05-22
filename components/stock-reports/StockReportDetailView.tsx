import Link from "next/link";
import { AuthorCard } from "@/components/AuthorCard";

import { SectorBadge } from "@/components/SectorBadge";
import { StockReportPdfPanel } from "@/components/stock-reports/StockReportPdfPanel";
import type { StockReport } from "@/lib/types";
import type { ResearchItem } from "@/lib/types";
import { calcUpside, formatDate } from "@/lib/utils";

interface StockReportDetailViewProps {
  item: ResearchItem;
  report: StockReport;
}

export function StockReportDetailView({ item, report }: StockReportDetailViewProps) {
  const upside = calcUpside(report.targetPrice, report.currentPrice);
  const pdfUrl = report.pdfUrl;

  return (
    <>
      <header className="stock-report-header border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="text-sm text-text-muted">
            <Link href="/research/stock-reports" className="hover:text-midnight">
              Stock Reports
            </Link>
            <span className="mx-2">/</span>
            <span className="font-mono font-semibold text-midnight">
              {report.ticker}
            </span>
          </nav>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-3xl font-bold tracking-tight text-midnight">
              {report.ticker}
            </span>
            
            <SectorBadge sector={report.sector} />
            {item.companyData && (
              <Link
                href={`/companies/${item.companyData.ticker}`}
                className="text-sm font-medium text-midnight hover:underline"
              >
                Company profile →
              </Link>
            )}
          </div>

          <h1 className="mt-3 font-serif text-3xl text-midnight md:text-4xl">
            {report.company}
          </h1>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              ["Current price", report.currentPrice.toLocaleString()],
              ["Target price", report.targetPrice.toLocaleString()],
              ["Upside", `${Number(upside) >= 0 ? "+" : ""}${upside}%`],
              ["Analyst", report.analyst],
              ["Published", formatDate(report.date)],
              ["Sector", report.sector],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border border-border bg-background px-4 py-3"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-midnight">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {report.summary && (
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-text-muted">
              {report.summary}
            </p>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            {pdfUrl ? (
              <StockReportPdfPanel
                pdfUrl={pdfUrl}
                title={`${report.company} (${report.ticker}) — Stock Report`}
              />
            ) : (
              <div className="border border-border bg-surface p-8 text-center text-text-muted">
                PDF report is not yet available. Check back after publication.
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {item.authorData && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Lead analyst
                </p>
                <AuthorCard author={item.authorData} />
              </div>
            )}
            <div className="border border-border bg-background p-5">
              <Link
                href="/research/stock-reports"
                className="text-sm font-medium text-midnight hover:underline"
              >
                ← All stock reports
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
