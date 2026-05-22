import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { AuthorRow } from "@/lib/types/database";

interface AuthorCardProps {
  author: AuthorRow;
}

export function AuthorCard({ author }: AuthorCardProps) {
  const initials =
    author.initials ??
    author.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="flex gap-4 border border-border bg-surface p-6">
      {author.avatar_url ? (
        <Image
          src={author.avatar_url}
          alt={author.name}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-midnight font-serif text-lg text-white">
          {initials}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-lg text-midnight">{author.name}</h3>
          {author.role && (
            <span className="text-xs font-medium text-text-muted">{author.role}</span>
          )}
          {author.linkedin_url && (
            <a
              href={author.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-text-muted hover:text-midnight"
              aria-label={`${author.name} on LinkedIn`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        {author.sector_focus && (
          <p className="mt-1 text-sm text-midnight">{author.sector_focus}</p>
        )}
        {author.bio && (
          <p className="mt-2 text-sm text-text-muted">{author.bio}</p>
        )}
      </div>
    </div>
  );
}
