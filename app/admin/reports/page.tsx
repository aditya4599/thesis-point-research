import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteReport } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllReportsAdmin } from "@/lib/queries/reports";
import { formatDate } from "@/lib/utils";

export default async function AdminReportsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const reports = await getAllReportsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-midnight">Research reports</h1>
        <Link
          href="/admin/reports/new"
          className="bg-midnight px-4 py-2 text-sm font-medium text-white"
        >
          New report
        </Link>
      </div>
      <div className="mt-8 overflow-x-auto border border-border bg-background">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text-muted">
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} className="border-b border-border">
                <td className="p-3 font-medium text-midnight">{r.title}</td>
                <td className="p-3">{r.category}</td>
                <td className="p-3">
                  {r.published_at
                    ? `Published ${formatDate(r.published_at)}`
                    : "Draft"}
                </td>
                <td className="p-3">{r.featured ? "Yes" : "—"}</td>
                <td className="p-3">
                  <Link
                    href={`/admin/reports/${r.id}/edit`}
                    className="text-midnight hover:underline"
                  >
                    Edit
                  </Link>
                  <form action={deleteReport} className="inline ml-3">
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
