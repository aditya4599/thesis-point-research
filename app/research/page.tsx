import { ResearchHubClient } from "@/components/ResearchHubClient";
import { getAllResearchItems } from "@/lib/queries/reports";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Research Library",
};

export default async function ResearchPage() {
  const items = await getAllResearchItems();
  return <ResearchHubClient items={items} />;
}
