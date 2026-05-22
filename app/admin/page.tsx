import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllReportsAdmin } from "@/lib/queries/reports";
import { getAllAuthorsAdmin } from "@/lib/queries/authors";
import { getAllCompaniesAdmin } from "@/lib/queries/companies";

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [reports, authors, companies] = await Promise.all([
    getAllReportsAdmin(),
    getAllAuthorsAdmin(),
    getAllCompaniesAdmin(),
  ]);

  const published = reports.filter((r) => r.published_at).length;
  const drafts = reports.length - published;

  return (
    <div>
      <h1 className="font-serif text-3xl text-midnight">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Reports", reports.length, "/admin/reports"],
          ["Published", published, "/admin/reports"],
          ["Drafts", drafts, "/admin/reports"],
          ["Authors", authors.length, "/admin/authors"],
          ["Companies", companies.length, "/admin/companies"],
        ].map(([label, count, href]) => (
          <Link
            key={label as string}
            href={href as string}
            className="border border-border bg-background p-6 shadow-card hover:shadow-card-hover"
          >
            <p className="text-sm text-text-muted">{label}</p>
            <p className="mt-2 font-serif text-3xl text-midnight">{count}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10 flex gap-4">
        <Link
          href="/admin/reports/new"
          className="bg-midnight px-4 py-2 text-sm font-medium text-white"
        >
          New report
        </Link>
        <Link
          href="/admin/authors"
          className="border border-border px-4 py-2 text-sm font-medium text-midnight"
        >
          Manage authors
        </Link>
      </div>
    </div>
  );
}
