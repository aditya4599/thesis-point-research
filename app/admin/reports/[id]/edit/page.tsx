import { notFound, redirect } from "next/navigation";
import { ReportForm } from "@/components/admin/ReportForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getReportByIdAdmin } from "@/lib/queries/reports";
import { getAllAuthorsAdmin } from "@/lib/queries/authors";
import { getAllCompaniesAdmin } from "@/lib/queries/companies";

export default async function EditReportPage({
  params,
}: {
  params: { id: string };
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [report, authors, companies] = await Promise.all([
    getReportByIdAdmin(params.id),
    getAllAuthorsAdmin(),
    getAllCompaniesAdmin(),
  ]);

  if (!report) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl text-midnight">Edit report</h1>
      <div className="mt-8">
        <ReportForm report={report} authors={authors} companies={companies} />
      </div>
    </div>
  );
}
