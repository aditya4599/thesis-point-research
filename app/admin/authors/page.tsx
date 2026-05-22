import { redirect } from "next/navigation";
import { AuthorForm } from "@/components/admin/AuthorForm";
import { deleteAuthor } from "@/app/admin/actions";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllAuthorsAdmin } from "@/lib/queries/authors";

export default async function AdminAuthorsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const authors = await getAllAuthorsAdmin();

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-3xl text-midnight">Authors</h1>
        <ul className="mt-6 space-y-3">
          {authors.map((a) => (
            <li key={a.id} className="flex items-center justify-between border border-border p-3">
              <span className="font-medium text-midnight">{a.name}</span>
              <form action={deleteAuthor}>
                <input type="hidden" name="id" value={a.id} />
                <button type="submit" className="text-sm text-red-600">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-serif text-xl text-midnight">Add author</h2>
        <div className="mt-4">
          <AuthorForm />
        </div>
      </div>
    </div>
  );
}
