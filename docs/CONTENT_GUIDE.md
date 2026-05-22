# ThesisPoint Content Guide

How articles and stock reports are separated, published, and rendered.

## Content types at a glance

| Type | Route | Rendering | PDF |
|------|-------|-----------|-----|
| **Article** | `/research/articles/[slug]` | Webpage (blocks + HTML) | Never |
| **Stock report** | `/research/stock-reports/[slug]` | PDF iframe + metadata | Always (from `pdf_url`) |
| Pitch deck | `/research/pitches/[slug]` | PDF viewer component | Optional |
| Sector note | `/research/sector-notes/[slug]` | Webpage HTML | No |

## Adding a new article

1. Sign in at `/admin/login`.
2. Go to **Reports → New report**.
3. Set **Category** to `Article`.
4. Fill in:
   - **Title**, **Slug**, **Excerpt**
   - **Subtitle** — appears under the headline (JP Morgan Insights style)
   - **Key takeaways** — one bullet per line (sidebar/intro block)
   - **Content (HTML fallback)** — used when `content_blocks` is empty
   - **Content blocks (JSON)** — optional modular body (see below)
   - **Hero image** — upload via thumbnail field (`report-thumbnails` bucket)
   - **Author**, **Sector**, **Tags**, **Reading time**
5. Do **not** upload a PDF for articles (CMS clears `pdf_url` on save).
6. Check **Published** and save.

### Article content blocks (future-ready)

Store an ordered JSON array in `content_blocks`:

```json
[
  { "type": "section", "data": { "heading": "Executive summary", "level": 2 } },
  { "type": "paragraph", "data": { "html": "<p>Your analysis...</p>" } },
  { "type": "takeaways", "data": { "title": "Key takeaways", "items": ["Point one", "Point two"] } },
  { "type": "quote", "data": { "text": "Markets reward discipline.", "attribution": "ThesisPoint Research" } },
  { "type": "image", "data": { "url": "https://...", "alt": "Chart", "caption": "Figure 1" } }
]
```

Supported block types (see `components/blocks/` and `RenderBlocks.tsx`):

- `hero` — inline hero image/subtitle (page header also shows hero from thumbnail)
- `paragraph` — `text` or `html`
- `takeaways` — bullet list
- `quote` — pull quote
- `image` — figure with optional caption
- `section` — section heading (h2/h3)

If `content_blocks` is empty, the site builds blocks from `content` HTML, `excerpt`, `metadata.key_takeaways`, and `thumbnail_url`.

## Adding a new stock report

1. **Reports → New report**
2. Set **Category** to `Stock Report`.
3. Fill in:
   - **Title**, **Slug**, **Excerpt** (summary shown in header)
   - **Ticker**, **Sector**, **Company** (link via company select)
   - **Rating**, **Target price**, **Current price** (metadata)
   - **Author**
4. Upload **PDF** to the `pdfs` storage bucket via the admin file picker.
5. Optional **Thumbnail** for listing cards only.
6. Check **Published** and save.

Stock report detail pages use **only** `StockReportPdfPanel` (iframe + Open PDF + Download PDF). No article block renderer.

## Where to upload files

| Asset | Admin field | Supabase bucket | Used on |
|-------|-------------|-----------------|---------|
| Article hero / card image | Hero image (thumbnail) | `report-thumbnails` | Article header, cards |
| Stock report PDF | PDF upload | `pdfs` | Stock report page iframe |
| Pitch PDF | PDF upload | `pdfs` | Pitch deck page |
| Author avatar | Authors admin | `author-avatars` | Author cards |
| Company logo | Companies admin | `company-logos` | Company pages |

## Publishing content

- **Draft**: leave **Published** unchecked (`published_at` is null).
- **Live**: check **Published** — sets `published_at` to now; RLS allows public read.
- After save, pages revalidate (`/` and `/research`).

## Database migration

Run `supabase/migrations/003_content_blocks.sql` to add the `content_blocks` column:

```sql
ALTER TABLE research_reports
  ADD COLUMN IF NOT EXISTS content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb;
```

## Architecture map

```
lib/types/blocks.ts          — block TypeScript types
lib/content/resolve-article-blocks.ts — legacy + blocks merge
lib/queries/articles.ts      — article-only fetch
lib/queries/stock-reports.ts — stock-report-only fetch

components/blocks/*          — Hero, Paragraph, Takeaways, Quote, Image, Section
components/RenderBlocks.tsx  — block switch / renderer
components/articles/ArticleDetailView.tsx
components/stock-reports/StockReportDetailView.tsx
components/stock-reports/StockReportPdfPanel.tsx
```

## Pages that use PDFs vs webpages

**Webpage rendering (no PDF):**

- `/research/articles/[slug]`
- `/research/sector-notes/[slug]`

**PDF rendering:**

- `/research/stock-reports/[slug]` — iframe + open/download (`pdf_url`)
- `/research/pitches/[slug]` — existing `PDFViewer` (react-pdf / fallback)

**Never PDF:**

- Article pages — PDF logic removed entirely
