import { ContentCard } from "@/components/ContentCard";
import { toPitch } from "@/lib/adapters";
import { getPublishedReports } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Pitch Decks",
};

export default async function PitchesPage() {
  const items = await getPublishedReports({ category: "pitch" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-midnight">Pitch Decks</h1>
      <p className="mt-2 text-text-muted">Investment theses in presentation format.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ContentCard key={item.id} type="pitch" data={toPitch(item)} />
        ))}
      </div>
    </div>
  );
}
