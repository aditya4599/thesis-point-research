"use client";

import { ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl text-midnight">Contact Us</h1>
      <p className="mt-2 max-w-xl text-text-muted">
        Reach out for research inquiries, partnerships, or press requests.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <form
          className="space-y-4 border border-border bg-surface p-8 shadow-card"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input className="mt-1" required placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input className="mt-1" type="email" required placeholder="you@company.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Subject</label>
            <select className="mt-1 flex h-10 w-full border border-border px-3 text-sm">
              <option>Research Inquiry</option>
              <option>Partnership</option>
              <option>Press</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="mt-1 flex min-h-[120px] w-full border border-border px-3 py-2 text-sm"
              required
              placeholder="How can we help?"
            />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>

        <div className="space-y-6">
          <div className="border border-border bg-surface p-6">
            <Mail className="h-6 w-6 text-midnight" />
            <h3 className="mt-3 font-semibold text-midnight">Email</h3>
            <a
              href="mailto:research@thesispoint.com"
              className="text-midnight hover:underline"
            >
              research@thesispoint.com
            </a>
          </div>
          <div className="border border-border bg-surface p-6">
            <ExternalLink className="h-6 w-6 text-midnight" />
            <h3 className="mt-3 font-semibold text-midnight">LinkedIn</h3>
            <a
              href="https://linkedin.com"
              className="text-midnight hover:underline"
            >
              ThesisPoint
            </a>
          </div>
          <div className="border border-dashed border-border bg-background p-8 text-center">
            <p className="text-sm text-text-muted">Calendly embed placeholder</p>
            <p className="mt-2 text-xs text-text-muted">
              Schedule a call with our research team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
