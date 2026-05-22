import Link from "next/link";
import { SectorBadge } from "@/components/SectorBadge";
import { SECTORS } from "@/lib/constants";
import { getPublishedReports } from "@/lib/queries/reports";
import { formatDate } from "@/lib/utils";
import type { Sector } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sector Deep Dives",
};

export default async function SectorNotesPage() {
  const notes = await getPublishedReports({ category: "sector-note" });

  const grouped = SECTORS.reduce(
    (acc, sector) => {
      acc[sector] = notes.filter((n) => n.sector === sector);
      return acc;
    },
    {} as Record<Sector, typeof notes>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-midnight">Sector Deep Dives</h1>
      <p className="mt-2 text-text-muted">
        Industry-level monitoring notes grouped by sector.
      </p>

      <div className="mt-12 space-y-12">
        {SECTORS.map((sector) => {
          const sectorNotes = grouped[sector];
          if (!sectorNotes.length) return null;
          return (
            <section key={sector} id={sector.toLowerCase()}>
              <div className="mb-6 flex items-center gap-3">
                <SectorBadge sector={sector} />
                <span className="text-sm text-text-muted">{sectorNotes.length} notes</span>
              </div>
              <div className="divide-y divide-border border border-border bg-surface">
                {sectorNotes.map((note) => (
                  <article key={note.id} id={note.slug} className="p-6 transition hover:bg-surface">
                    <h2 className="font-serif text-xl text-midnight">
                      <Link href={`/research/sector-notes/${note.slug}`}>{note.title}</Link>
                    </h2>
                    <p className="mt-1 text-sm text-text-muted">
                      {note.author} · {formatDate(note.date)}
                    </p>
                    <p className="mt-3 text-text-muted">{note.summary}</p>
                    <Link
                      href={`/research/sector-notes/${note.slug}`}
                      className="mt-3 inline-block text-sm font-medium text-midnight"
                    >
                      Read full note →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
