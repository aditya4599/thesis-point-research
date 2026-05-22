import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/AuthorCard";
import { SectorBadge } from "@/components/SectorBadge";
import { getReportBySlug } from "@/lib/queries/reports";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await getReportBySlug(params.slug);
  return { title: item?.title ?? "Sector Note" };
}

export default async function SectorNoteDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const note = await getReportBySlug(params.slug);
  if (!note || note.type !== "sector-note") notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/research/sector-notes" className="text-sm text-midnight">
        ← Sector Deep Dives
      </Link>
      <div className="mt-4">
        <SectorBadge sector={note.sector} />
      </div>
      <h1 className="mt-4 font-serif text-4xl text-midnight">{note.title}</h1>
      <p className="mt-2 text-sm text-text-muted">
        {note.author} · {formatDate(note.date)}
      </p>
      <div
        className="prose-research mt-8"
        dangerouslySetInnerHTML={{
          __html: note.content ?? `<p>${note.summary}</p>`,
        }}
      />
      {note.authorData && (
        <div className="mt-12">
          <AuthorCard author={note.authorData} />
        </div>
      )}
    </div>
  );
}
