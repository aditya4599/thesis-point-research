import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { SectorBadge } from "@/components/SectorBadge";
import { toPitch, toStockReport } from "@/lib/adapters";
import { getCompanyByTicker } from "@/lib/queries/companies";
import { getPublishedReports } from "@/lib/queries/reports";
import type { Sector } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { ticker: string } }) {
  const company = await getCompanyByTicker(params.ticker);
  return { title: company?.name ?? "Company" };
}

export default async function CompanyPage({
  params,
}: {
  params: { ticker: string };
}) {
  const company = await getCompanyByTicker(params.ticker);
  if (!company) notFound();

  const allReports = await getPublishedReports();
  const related = allReports.filter(
    (r) => r.ticker?.toUpperCase() === company.ticker.toUpperCase()
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start gap-6">
        {company.logo_url ? (
          <Image
            src={company.logo_url}
            alt={company.name}
            width={80}
            height={80}
            className="h-20 w-20 object-contain"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center bg-midnight font-mono text-xl font-bold text-white">
            {company.ticker.slice(0, 2)}
          </div>
        )}
        <div>
          <span className="font-mono text-sm font-bold text-midnight">{company.ticker}</span>
          <h1 className="font-serif text-4xl text-midnight">{company.name}</h1>
          {company.sector && (
            <div className="mt-2">
              <SectorBadge sector={company.sector as Sector} />
            </div>
          )}
          {company.description && (
            <p className="mt-4 max-w-2xl text-text-muted">{company.description}</p>
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-midnight">Research coverage</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => {
            if (item.type === "stock-report")
              return <ContentCard key={item.id} type="report" data={toStockReport(item)} />;
            if (item.type === "pitch")
              return <ContentCard key={item.id} type="pitch" data={toPitch(item)} />;
            return null;
          })}
        </div>
        {related.length === 0 && (
          <p className="mt-4 text-text-muted">No published research for this company yet.</p>
        )}
      </section>

      <Link href="/research" className="mt-8 inline-block text-sm text-midnight">
        ← Research library
      </Link>
    </div>
  );
}
