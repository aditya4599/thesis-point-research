"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  FileText,
  LineChart,
  Menu,
  Presentation,
  Search,
  X,
  Layers,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const researchLinks = [
  {
    href: "/research/articles",
    label: "Articles",
    icon: FileText,
    desc: "Market commentary and thematic notes",
  },
  {
    href: "/research/stock-reports",
    label: "Stock Reports",
    icon: LineChart,
    desc: "Initiations, updates, and ratings",
  },
  {
    href: "/research/pitches",
    label: "Pitch Decks",
    icon: Presentation,
    desc: "Investment theses in deck format",
  },
  {
    href: "/research/sector-notes",
    label: "Sector Notes",
    icon: Layers,
    desc: "Deep dives by industry",
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-midnight text-white transition-shadow",
        scrolled && "shadow-md"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <BrandLogo variant="navbar" />

        <div className="hidden items-center gap-8 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setResearchOpen(true)}
            onMouseLeave={() => setResearchOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white"
            >
              Research
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {researchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 top-full w-[480px] border border-border bg-background p-4 shadow-card-hover"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {researchLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex gap-3 p-3 hover:bg-surface"
                      >
                        <link.icon className="mt-0.5 h-5 w-5 shrink-0 text-midnight" />
                        <div>
                          <span className="text-sm font-semibold text-midnight">
                            {link.label}
                          </span>
                          <p className="text-xs text-text-muted">{link.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/research"
                    className="mt-2 block border-t border-border pt-3 text-center text-sm font-medium text-midnight"
                  >
                    View Research Library →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/about"
            className="text-sm font-medium text-white/90 hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white/90 hover:text-white"
          >
            Contact
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/research"
            className="text-white/70 hover:text-white"
            aria-label="Search research"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-background/10"
          >
            <Link href="/#newsletter">Subscribe</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-background p-6 shadow-xl md:hidden"
            >
              <div className="flex justify-end">
                <button type="button" onClick={() => setMenuOpen(false)}>
                  <X className="h-6 w-6 text-midnight" />
                </button>
              </div>
              <div className="mt-6 space-y-4 text-text-primary">
                <p className="text-xs font-semibold uppercase text-text-muted">
                  Research
                </p>
                {researchLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium text-midnight"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/research"
                  className="block text-lg font-medium text-midnight"
                  onClick={() => setMenuOpen(false)}
                >
                  All Research
                </Link>
                <hr className="border-border" />
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
                <Button asChild className="w-full">
                  <Link href="/#newsletter">Subscribe</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
