import { ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StockReportPdfPanelProps {
  pdfUrl: string;
  title: string;
}

/**
 * Stock-report-only PDF presentation: iframe embed + open + download.
 * Not used on article pages.
 */
export function StockReportPdfPanel({ pdfUrl, title }: StockReportPdfPanelProps) {
  return (
    <section className="stock-report-pdf-panel" aria-label="Full report PDF">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <h2 className="font-serif text-xl text-midnight">Full report</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open PDF
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href={pdfUrl} download target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      <iframe
        src={pdfUrl}
        title={title}
        className="stock-report-pdf-iframe"
      />
    </section>
  );
}
