"use client";

import { useState } from "react";
import { saveReport, uploadAdminFile } from "@/app/admin/actions";
import type {
  ArticlePageMeta,
  AuthorRow,
  CompanyRow,
  ReportCategory,
  ResearchReportRow,
} from "@/lib/types/database";
import { SECTORS } from "@/lib/constants";

interface ReportFormProps {
  report?: ResearchReportRow;
  authors: AuthorRow[];
  companies: CompanyRow[];
}

export function ReportForm({ report, authors, companies }: ReportFormProps) {
  const meta = (report?.metadata ?? {}) as ArticlePageMeta;
  const [category, setCategory] = useState<ReportCategory>(
    report?.category ?? "article"
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(report?.thumbnail_url ?? "");
  const [pdfUrl, setPdfUrl] = useState(report?.pdf_url ?? "");
  const [uploading, setUploading] = useState<string | null>(null);

  const isArticle = category === "article";
  const isStockReport = category === "stock-report";
  const blocksDefault = report?.content_blocks
    ? JSON.stringify(report.content_blocks, null, 2)
    : "";

  async function handleUpload(
    bucket: "pdfs" | "report-thumbnails",
    file: File,
    setter: (url: string) => void
  ) {
    setUploading(bucket);
    const fd = new FormData();
    fd.set("bucket", bucket);
    fd.set("file", file);
    const result = await uploadAdminFile(fd);
    if (result.url) setter(result.url);
    setUploading(null);
  }

  return (
    <form action={saveReport} className="max-w-2xl space-y-6">
      {report?.id && <input type="hidden" name="id" value={report.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Title *
          <input
            name="title"
            required
            defaultValue={report?.title}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          Slug
          <input
            name="slug"
            defaultValue={report?.slug}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
      </div>

      <label className="block text-sm">
        Category *
        <select
          name="category"
          required
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as ReportCategory)
          }
          className="mt-1 w-full border border-border px-3 py-2"
        >
          <option value="article">Article</option>
          <option value="stock-report">Stock Report</option>
          <option value="pitch">Pitch Deck</option>
          <option value="sector-note">Sector Note</option>
        </select>
      </label>

      <label className="block text-sm">
        Excerpt
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={report?.excerpt ?? ""}
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>

      {isArticle && (
        <>
          <label className="block text-sm">
            Subtitle (article hero)
            <input
              name="subtitle"
              defaultValue={meta.subtitle ?? ""}
              className="mt-1 w-full border border-border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Key takeaways (one per line)
            <textarea
              name="key_takeaways"
              rows={4}
              defaultValue={(meta.key_takeaways ?? []).join("\n")}
              className="mt-1 w-full border border-border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Content blocks (JSON — optional, overrides HTML fallback)
            <textarea
              name="content_blocks"
              rows={10}
              defaultValue={blocksDefault}
              placeholder={'[{"type":"paragraph","data":{"html":"<p>...</p>"}}]'}
              className="mt-1 w-full border border-border px-3 py-2 font-mono text-xs"
            />
          </label>
        </>
      )}

      <label className="block text-sm">
        {isArticle ? "Content (HTML fallback)" : "Content (optional notes)"}
        <textarea
          name="content"
          rows={8}
          defaultValue={report?.content ?? ""}
          className="mt-1 w-full border border-border px-3 py-2 font-mono text-xs"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Sector
          <select
            name="sector"
            defaultValue={report?.sector ?? ""}
            className="mt-1 w-full border border-border px-3 py-2"
          >
            <option value="">—</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Ticker
          <input
            name="ticker"
            defaultValue={report?.ticker ?? ""}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Author
          <select
            name="author_id"
            defaultValue={report?.author_id ?? ""}
            className="mt-1 w-full border border-border px-3 py-2"
          >
            <option value="">—</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Company
          <select
            name="company_id"
            defaultValue={report?.company_id ?? ""}
            className="mt-1 w-full border border-border px-3 py-2"
          >
            <option value="">—</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.ticker})
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="border border-border p-4">
        <legend className="px-2 text-sm font-semibold">Stock / pitch metadata</legend>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Company name
            <input
              name="company_name"
              defaultValue={meta.company_name ?? ""}
              className="mt-1 w-full border border-border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Rating
            <select
              name="rating"
              defaultValue={meta.rating ?? ""}
              className="mt-1 w-full border border-border px-3 py-2"
            >
              <option value="">—</option>
              <option value="BUY">BUY</option>
              <option value="HOLD">HOLD</option>
              <option value="SELL">SELL</option>
            </select>
          </label>
          <label className="block text-sm">
            Target price
            <input
              name="target_price"
              type="number"
              step="0.01"
              defaultValue={meta.target_price ?? ""}
              className="mt-1 w-full border border-border px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            Current price
            <input
              name="current_price"
              type="number"
              step="0.01"
              defaultValue={meta.current_price ?? ""}
              className="mt-1 w-full border border-border px-3 py-2"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm">
          Thesis / tags
          <input
            name="thesis"
            defaultValue={meta.thesis ?? ""}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
        <label className="mt-2 block text-sm">
          Tags (comma-separated)
          <input
            name="tags"
            defaultValue={(meta.tags ?? []).join(", ")}
            className="mt-1 w-full border border-border px-3 py-2"
          />
        </label>
      </fieldset>

      <label className="block text-sm">
        Reading time
        <input
          name="reading_time"
          defaultValue={report?.reading_time ?? ""}
          placeholder="8 min"
          className="mt-1 w-full border border-border px-3 py-2"
        />
      </label>

      <div className="space-y-2">
        <input type="hidden" name="thumbnail_url" value={thumbnailUrl} />
        <p className="text-sm font-medium">
          {isArticle ? "Hero image (thumbnail)" : "Thumbnail"}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleUpload("report-thumbnails", f, setThumbnailUrl);
          }}
        />
        {uploading === "report-thumbnails" && (
          <p className="text-xs text-text-muted">Uploading…</p>
        )}
        {thumbnailUrl && (
          <p className="truncate text-xs text-text-muted">{thumbnailUrl}</p>
        )}
      </div>

      {(isStockReport || category === "pitch") && (
        <div className="space-y-2">
          <input type="hidden" name="pdf_url" value={pdfUrl} />
          <p className="text-sm font-medium">
            PDF {isStockReport ? "(required for stock report viewer)" : ""}
          </p>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload("pdfs", f, setPdfUrl);
            }}
          />
          {uploading === "pdfs" && (
            <p className="text-xs text-text-muted">Uploading…</p>
          )}
          {pdfUrl && (
            <p className="truncate text-xs text-text-muted">{pdfUrl}</p>
          )}
        </div>
      )}

      {isArticle && (
        <p className="text-xs text-text-muted">
          Articles render as webpages only — do not upload a PDF for articles.
        </p>
      )}

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={report?.featured}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={!!report?.published_at}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        className="bg-midnight px-6 py-2 text-sm font-medium text-white"
      >
        Save report
      </button>
    </form>
  );
}
