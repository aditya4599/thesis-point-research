import { redirect } from "next/navigation";
import { saveCompany, deleteCompany } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllCompaniesAdmin } from "@/lib/queries/companies";
import { SECTORS } from "@/lib/constants";

export default async function AdminCompaniesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const companies = await getAllCompaniesAdmin();

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-3xl text-midnight">Companies</h1>
        <ul className="mt-6 space-y-3">
          {companies.map((c) => (
            <li key={c.id} className="flex items-center justify-between border border-border p-3">
              <span>
                <span className="font-mono font-bold text-midnight">{c.ticker}</span>
                {" — "}
                {c.name}
              </span>
              <form action={deleteCompany}>
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className="text-sm text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl text-midnight">Add company</h2>
        <form action={saveCompany} className="mt-4 max-w-lg space-y-4">
          <label className="block text-sm">
            Name *
            <input name="name" required className="mt-1 w-full border border-border px-3 py-2" />
          </label>
          <label className="block text-sm">
            Ticker *
            <input name="ticker" required className="mt-1 w-full border border-border px-3 py-2" />
          </label>
          <label className="block text-sm">
            Sector
            <select name="sector" className="mt-1 w-full border border-border px-3 py-2">
              <option value="">—</option>
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Description
            <textarea name="description" rows={3} className="mt-1 w-full border border-border px-3 py-2" />
          </label>
          <button type="submit" className="bg-midnight px-6 py-2 text-sm text-white">Save company</button>
        </form>
      </div>
    </div>
  );
}
