import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-midnight pb-20 pt-16 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo variant="footer" />
            <p className="mt-2 max-w-md text-sm">
              Independent investment research for serious investors. Deep-dive
              reports, pitch decks, and sector intelligence.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="https://linkedin.com" className="hover:text-white">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-white" aria-label="X">
                <X className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Research
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/research" className="hover:text-white">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/research/articles" className="hover:text-white">
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/research/stock-reports"
                  className="hover:text-white"
                >
                  Stock Reports
                </Link>
              </li>
              <li>
                <Link href="/research/pitches" className="hover:text-white">
                  Pitch Decks
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} ThesisPoint. All rights
          reserved. The information on this site is for informational purposes
          only and does not constitute investment advice or a recommendation to
          buy or sell any security.
        </p>
      </div>
    </footer>
  );
}
