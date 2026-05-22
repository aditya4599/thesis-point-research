-- ThesisPoint CMS schema

-- Authors
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  role TEXT,
  bio TEXT,
  initials TEXT,
  linkedin_url TEXT,
  avatar_url TEXT,
  sector_focus TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Companies
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  ticker TEXT NOT NULL UNIQUE,
  sector TEXT,
  logo_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Research reports (articles, stock reports, pitches, sector notes)
CREATE TABLE IF NOT EXISTS research_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL CHECK (category IN ('article', 'stock-report', 'pitch', 'sector-note')),
  sector TEXT,
  ticker TEXT,
  reading_time TEXT,
  thumbnail_url TEXT,
  pdf_url TEXT,
  published_at TIMESTAMPTZ,
  featured BOOLEAN NOT NULL DEFAULT false,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_research_reports_category ON research_reports(category);
CREATE INDEX IF NOT EXISTS idx_research_reports_published ON research_reports(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_research_reports_featured ON research_reports(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_research_reports_slug ON research_reports(slug);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security (public read for published content)
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Public read companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read published reports" ON research_reports
  FOR SELECT USING (published_at IS NOT NULL AND published_at <= now());

-- Newsletter: allow anonymous inserts only
CREATE POLICY "Public insert newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Storage buckets (run in Supabase dashboard or via API)
-- pdfs, report-thumbnails, company-logos, author-avatars
