"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterBannerProps {
  compact?: boolean;
}

export function NewsletterBanner({ compact = false }: NewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className={
        compact
          ? "rounded-sm border border-midnight/30 bg-midnight p-6"
          : "bg-midnight py-16"
      }
    >
      <div className={compact ? "" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
        <h2
          className={`font-serif text-white ${compact ? "text-xl" : "text-3xl"}`}
        >
          Get our research in your inbox
        </h2>
        <p
          className={`mt-2 text-slate-300 ${compact ? "text-sm" : "text-base"}`}
        >
          Weekly insights and report alerts from ThesisPoint research.
        </p>
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            className="max-w-md border-slate-600 bg-background/10 text-white placeholder:text-slate-400"
            aria-label="Email address"
          />
          <Button type="submit" className="shrink-0" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing…" : "Subscribe for Free"}
          </Button>
        </form>
        {status === "success" && (
          <p className="mt-2 text-sm text-emerald-300">Thank you — you are subscribed.</p>
        )}
        {status === "duplicate" && (
          <p className="mt-2 text-sm text-amber-200">This email is already subscribed.</p>
        )}
        {status === "error" && (
          <p className="mt-2 text-sm text-red-300">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
