-- Modular article content blocks (articles only; stock reports use pdf_url)
ALTER TABLE research_reports
  ADD COLUMN IF NOT EXISTS content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN research_reports.content_blocks IS
  'Ordered block array for article webpage rendering. Stock reports use pdf_url.';
