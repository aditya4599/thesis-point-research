import { redirect } from "next/navigation";
import { ReportForm } from "@/components/admin/ReportForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllAuthorsAdmin } from "@/lib/queries/authors";
import { getAllCompaniesAdmin } from "@/lib/queries/companies";

export default async function NewReportPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [authors, companies] = await Promise.all([
    getAllAuthorsAdmin(),
    getAllCompaniesAdmin(),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-midnight">New report</h1>
      <div className="mt-8">
        <ReportForm authors={authors} companies={companies} />
      </div>
    </div>
  );
}
