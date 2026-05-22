import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { AuthorCard } from "@/components/AuthorCard";
import { PDFViewer } from "@/components/PDFViewer";
import { SectorBadge } from "@/components/SectorBadge";
import { Button } from "@/components/ui/button";
import { toPitch } from "@/lib/adapters";
import { getReportBySlug } from "@/lib/queries/reports";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getReportBySlug(params.slug);
  const pitch = item ? toPitch(item) : null;
  return { title: pitch ? `${pitch.company} Pitch` : "Pitch Deck" };
}

export default async function PitchDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getReportBySlug(params.slug);
  if (!item || item.type !== "pitch") notFound();

  const pitch = toPitch(item);
  const pdfUrl = pitch.pdfUrl;

  if (!pdfUrl) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-text-muted">PDF not yet available for this pitch.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/research/pitches" className="text-sm text-midnight">← Pitch Decks</Link>
          <h1 className="mt-2 font-serif text-3xl text-midnight">{pitch.company}</h1>
          <p className="text-sm text-text-muted">
            {pitch.ticker} · {pitch.analyst} · {formatDate(pitch.date)}
          </p>
          <div className="mt-2">
            <SectorBadge sector={pitch.sector} />
          </div>
        </div>
        <Button asChild>
          <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <PDFViewer url={pdfUrl} title={`${pitch.company} Pitch Deck`} />
        <aside className="space-y-4">
          <div className="border border-border bg-background p-5">
            <h2 className="font-serif text-lg text-midnight">Thesis Summary</h2>
            <p className="mt-2 text-sm text-text-muted">{pitch.thesis}</p>
          </div>
          {item.authorData && <AuthorCard author={item.authorData} />}
        </aside>
      </div>
    </div>
  );
}
