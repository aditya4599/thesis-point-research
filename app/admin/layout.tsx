import Link from "next/link";
import { adminLogout } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-surface">
      {authed && (
        <header className="border-b border-border bg-midnight text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/admin" className="font-serif text-lg font-bold">
              ThesisPoint CMS
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin/reports" className="hover:underline">
                Reports
              </Link>
              <Link href="/admin/authors" className="hover:underline">
                Authors
              </Link>
              <Link href="/admin/companies" className="hover:underline">
                Companies
              </Link>
              <Link href="/" className="text-white/70 hover:text-white">
                View site
              </Link>
              <form action={adminLogout}>
                <button type="submit" className="text-white/70 hover:text-white">
                  Logout
                </button>
              </form>
            </nav>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
