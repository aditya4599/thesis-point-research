-- Storage buckets and policies
-- Run after enabling storage in Supabase project

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('pdfs', 'pdfs', true),
  ('report-thumbnails', 'report-thumbnails', true),
  ('company-logos', 'company-logos', true),
  ('author-avatars', 'author-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Public read for all buckets
CREATE POLICY "Public read pdfs" ON storage.objects
  FOR SELECT USING (bucket_id = 'pdfs');

CREATE POLICY "Public read report thumbnails" ON storage.objects
  FOR SELECT USING (bucket_id = 'report-thumbnails');

CREATE POLICY "Public read company logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'company-logos');

CREATE POLICY "Public read author avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'author-avatars');

-- Service role uploads via admin (no public insert policy)
