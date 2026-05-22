# Supabase Setup — ThesisPoint CMS

## 1. Create Supabase project

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Copy **Project URL** and **anon public** key.
3. Copy **service_role** key (server-only, never expose to the browser).

## 2. Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_SECRET=your-strong-password
```

## 3. Run database migrations

In the Supabase SQL Editor, run in order:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_storage_buckets.sql`
3. `supabase/migrations/003_content_blocks.sql` (article modular blocks)
4. `supabase/seed.sql` (starter data) **or** full seed:

```bash
npx tsx scripts/seed-from-json.ts
```

## 4. Storage buckets

Migration `002_storage_buckets.sql` creates:

| Bucket | Purpose |
|--------|---------|
| `pdfs` | Research report PDFs |
| `report-thumbnails` | Card thumbnails |
| `company-logos` | Company logos |
| `author-avatars` | Author profile images |

All buckets are **public read**. Uploads use the **service role** via the admin CMS.

## 5. Row Level Security

- **Public site**: anon key can `SELECT` published reports, authors, companies; `INSERT` newsletter emails only.
- **Admin CMS**: uses `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS) with cookie auth (`ADMIN_SECRET`).

## 6. Admin CMS

- URL: `/admin/login`
- Sign in with `ADMIN_SECRET`
- Manage reports, authors, companies at `/admin`

## 7. Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` (public) and `http://localhost:3000/admin/login` (CMS).

See **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** for how articles (webpages) vs stock reports (PDFs) are published.
