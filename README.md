# ThesisPoint

Institutional equity research platform — editorial finance aesthetic, Supabase CMS backend.

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Configure Supabase keys (see docs/SUPABASE_SETUP.md)
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin CMS: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Stack

- **Next.js 14** (App Router, server components)
- **Supabase** — Postgres, storage, RLS
- **Tailwind CSS** — midnight blue editorial design system
- **react-pdf** — inline PDF viewer for reports and pitches

## Content

All published content lives in Supabase (`research_reports`, `authors`, `companies`). Legacy JSON in `data/` is used only by `npm run seed` to migrate into Supabase.

See **[docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)** for migrations, storage buckets, and admin setup.

## Design

Midnight blue primary (`#071A34`), soft white background (`#FCFCFD`). Serif headings (Playfair Display), sans body (Inter).
