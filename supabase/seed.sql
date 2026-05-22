-- Seed data migrated from data/*.json
-- Run after 001_initial_schema.sql

-- Authors (from team.json)
INSERT INTO authors (name, slug, role, bio, initials, linkedin_url, sector_focus) VALUES
  ('Arjun Mehta', 'arjun-mehta', 'Lead Analyst', 'Former sell-side analyst with 12 years covering emerging markets financials and commodities.', 'AM', 'https://linkedin.com/in/arjun-mehta', 'Financials, Energy, Macro'),
  ('Priya Sharma', 'priya-sharma', 'Senior Analyst', 'Specializes in TMT and Indian consumer equities with a focus on structural growth and unit economics.', 'PS', 'https://linkedin.com/in/priya-sharma', 'Technology, Consumer'),
  ('James Chen', 'james-chen', 'Senior Analyst', 'Covers US healthcare services and global industrials with deep expertise in cycle analysis.', 'JC', 'https://linkedin.com/in/james-chen', 'Healthcare, Industrials, Macro'),
  ('Elena Vasquez', 'elena-vasquez', 'Associate Analyst', 'Supports coverage of banks and consumer discretionary with quantitative screening and model builds.', 'EV', 'https://linkedin.com/in/elena-vasquez', 'Financials, Consumer')
ON CONFLICT (slug) DO NOTHING;

-- Companies (from stock reports & pitches)
INSERT INTO companies (name, ticker, sector) VALUES
  ('HDFC Bank', 'HDFCB', 'Financials'),
  ('NVIDIA Corporation', 'NVDA', 'Technology'),
  ('UnitedHealth Group', 'UNH', 'Healthcare'),
  ('Zomato', 'ZOMATO', 'Consumer'),
  ('Adani Green Energy', 'ADANIGREEN', 'Energy'),
  ('Infosys', 'INFY', 'Technology'),
  ('Sun Pharmaceutical', 'SUNPHARMA', 'Healthcare')
ON CONFLICT (ticker) DO NOTHING;

-- Articles
INSERT INTO research_reports (title, slug, excerpt, content, category, sector, reading_time, published_at, featured, author_id, metadata)
SELECT
  'India Financials: A Decade of Structural Tailwinds',
  'india-financials-outlook-2025',
  'We examine why Indian private sector banks remain a core long-term holding amid credit cycle normalization and digital adoption.',
  '<h2>Executive Summary</h2><p>Indian private sector banks are entering a phase of sustained ROE expansion driven by improving liability franchises, digital distribution, and benign credit costs.</p><h2>Structural Tailwinds</h2><p>Credit penetration in India remains low relative to GDP, providing a long runway for loan growth.</p><h2>Conclusion</h2><p>We maintain a positive bias on top-tier private banks and highlight HDFC Bank as a core holding.</p>',
  'article', 'Financials', '8 min', '2025-05-10'::timestamptz, true,
  (SELECT id FROM authors WHERE slug = 'arjun-mehta'),
  '{"tags":["India","Banking","EM"]}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM research_reports WHERE slug = 'india-financials-outlook-2025');

INSERT INTO research_reports (title, slug, excerpt, category, sector, reading_time, published_at, featured, author_id, metadata)
SELECT 'The AI Infrastructure Spend Cycle: Who Captures the Margin?', 'ai-infrastructure-spend-cycle',
  'Hyperscaler capex is accelerating, but the value chain winners may not be the obvious names.',
  'article', 'Technology', '12 min', '2025-05-02'::timestamptz, true,
  (SELECT id FROM authors WHERE slug = 'priya-sharma'), '{"tags":["AI","Semiconductors","Cloud"]}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM research_reports WHERE slug = 'ai-infrastructure-spend-cycle');

INSERT INTO research_reports (title, slug, excerpt, category, sector, reading_time, published_at, author_id, metadata)
SELECT 'Healthcare Services: Consolidation Meets Pricing Power', 'healthcare-services-consolidation',
  'Regional hospital operators are gaining scale.',
  'article', 'Healthcare', '10 min', '2025-04-18'::timestamptz,
  (SELECT id FROM authors WHERE slug = 'james-chen'), '{"tags":["Healthcare","Services"]}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM research_reports WHERE slug = 'healthcare-services-consolidation');

-- Stock reports (sample - run full seed via scripts/seed.ts for complete data)
INSERT INTO research_reports (title, slug, excerpt, category, sector, ticker, published_at, featured, author_id, company_id, metadata)
SELECT 'HDFC Bank Initiation', 'hdfc-bank-initiation',
  'Initiating coverage with BUY. HDFC Bank merger integration is underway with improving deposit growth.',
  'stock-report', 'Financials', 'HDFCB', '2025-04-22'::timestamptz, true,
  (SELECT id FROM authors WHERE slug = 'arjun-mehta'),
  (SELECT id FROM companies WHERE ticker = 'HDFCB'),
  '{"rating":"BUY","target_price":1850,"current_price":1520,"company_name":"HDFC Bank"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM research_reports WHERE slug = 'hdfc-bank-initiation');

INSERT INTO research_reports (title, slug, excerpt, category, sector, ticker, published_at, featured, author_id, company_id, metadata)
SELECT 'NVIDIA AI Leadership', 'nvidia-ai-leadership',
  'Data center demand remains structurally under-supplied.',
  'stock-report', 'Technology', 'NVDA', '2025-05-01'::timestamptz, true,
  (SELECT id FROM authors WHERE slug = 'priya-sharma'),
  (SELECT id FROM companies WHERE ticker = 'NVDA'),
  '{"rating":"BUY","target_price":1050,"current_price":892,"company_name":"NVIDIA Corporation"}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM research_reports WHERE slug = 'nvidia-ai-leadership');

-- Pitches
INSERT INTO research_reports (title, slug, excerpt, category, sector, ticker, published_at, featured, author_id, company_id, metadata)
SELECT 'Zomato Pitch Deck', 'zomato-bull-case-pitch',
  'Zomato quick commerce flywheel creates winner-take-most dynamic in urban India.',
  'pitch', 'Consumer', 'ZOMATO', '2025-03-15'::timestamptz, true,
  (SELECT id FROM authors WHERE slug = 'priya-sharma'),
  (SELECT id FROM companies WHERE ticker = 'ZOMATO'),
  '{"company_name":"Zomato","thesis":"Zomato quick commerce flywheel creates a winner-take-most dynamic in urban India with improving unit economics."}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM research_reports WHERE slug = 'zomato-bull-case-pitch');

-- Sector notes
INSERT INTO research_reports (title, slug, excerpt, category, sector, published_at, author_id)
SELECT 'Indian Banks: Credit Cycle Positioning', 'indian-banks-credit-cycle',
  'Asset quality trends remain benign while loan growth re-accelerates in retail and SME segments.',
  'sector-note', 'Financials', '2025-05-05'::timestamptz,
  (SELECT id FROM authors WHERE slug = 'arjun-mehta')
WHERE NOT EXISTS (SELECT 1 FROM research_reports WHERE slug = 'indian-banks-credit-cycle');
