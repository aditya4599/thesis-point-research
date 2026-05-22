"use client";

import { Share2 } from "lucide-react";

export function ShareButton({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: summary,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Link copied to clipboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="text-text-muted hover:text-midnight"
      aria-label="Share article"
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}