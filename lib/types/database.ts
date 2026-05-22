export type ReportCategory =
  | "article"
  | "stock-report"
  | "pitch"
  | "sector-note";

export type Sector =
  | "Technology"
  | "Healthcare"
  | "Financials"
  | "Energy"
  | "Consumer"
  | "Industrials"
  | "Macro";

export type Rating = "BUY" | "HOLD" | "SELL";

export interface ReportMetadata {
  rating?: Rating;
  target_price?: number;
  current_price?: number;
  company_name?: string;
  tags?: string[];
  thesis?: string;
}

/** Article-specific fields stored in metadata JSONB */
export interface ArticlePageMeta extends ReportMetadata {
  subtitle?: string;
  key_takeaways?: string[];
  hero_image_url?: string;
}

export interface AuthorRow {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  bio: string | null;
  initials: string | null;
  linkedin_url: string | null;
  avatar_url: string | null;
  sector_focus: string | null;
  created_at: string;
}

export interface CompanyRow {
  id: string;
  name: string;
  ticker: string;
  sector: string | null;
  logo_url: string | null;
  description: string | null;
  created_at: string;
}

export interface ResearchReportRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  content_blocks: unknown;
  category: ReportCategory;
  sector: string | null;
  ticker: string | null;
  reading_time: string | null;
  thumbnail_url: string | null;
  pdf_url: string | null;
  published_at: string | null;
  featured: boolean;
  author_id: string | null;
  company_id: string | null;
  metadata: ReportMetadata;
  created_at: string;
  authors?: AuthorRow | null;
  companies?: CompanyRow | null;
}

export interface NewsletterSubscriberRow {
  id: string;
  email: string;
  created_at: string;
}

export type ResearchReportInsert = Omit<
  ResearchReportRow,
  "id" | "created_at" | "authors" | "companies"
> & { id?: string; created_at?: string };

export type AuthorInsert = Omit<AuthorRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type CompanyInsert = Omit<CompanyRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: AuthorRow;
        Insert: AuthorInsert;
        Update: Partial<AuthorInsert>;
        Relationships: [];
      };
      companies: {
        Row: CompanyRow;
        Insert: CompanyInsert;
        Update: Partial<CompanyInsert>;
        Relationships: [];
      };
      research_reports: {
        Row: ResearchReportRow;
        Insert: ResearchReportInsert;
        Update: Partial<ResearchReportInsert>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriberRow;
        Insert: { email: string; id?: string; created_at?: string };
        Update: Partial<NewsletterSubscriberRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
