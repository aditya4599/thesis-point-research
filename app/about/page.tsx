import { AuthorCard } from "@/components/AuthorCard";
import { getAuthors } from "@/lib/queries/authors";

export const dynamic = "force-dynamic";

const pillars = [
  {
    title: "Independent",
    desc: "Unbiased research free from investment banking conflicts. Our ratings reflect conviction, not relationships.",
  },
  {
    title: "Data-Driven",
    desc: "Every thesis is grounded in rigorous modeling, primary research, and transparent assumptions.",
  },
  {
    title: "Long-Term",
    desc: "We focus on structural winners and sustainable competitive advantages, not short-term noise.",
  },
];

export const metadata = {
  title: "About",
};

export default async function AboutPage() {
  const team = await getAuthors();

  return (
    <>
      <section className="bg-midnight py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <blockquote className="font-serif text-3xl leading-relaxed sm:text-4xl">
            &ldquo;We publish research we would own — clear theses, honest risks,
            and the discipline to change our minds when the facts change.&rdquo;
          </blockquote>
          <p className="mt-6 text-slate-400">— ThesisPoint</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl text-midnight">Our Approach</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="border border-border bg-surface p-8 text-center shadow-card">
                <h3 className="font-serif text-xl text-midnight">{p.title}</h3>
                <p className="mt-4 text-sm text-text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-midnight">Our Team</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {team.map((member) => (
              <AuthorCard key={member.id} author={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl text-midnight">Press Mentions</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["Financial Times", "Bloomberg", "ET Prime", "Moneycontrol"].map((name) => (
              <span key={name} className="font-serif text-lg text-text-muted">{name}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
