"use client";

import { useState } from "react";
import { saveAuthor, uploadAdminFile } from "@/app/admin/actions";
import type { AuthorRow } from "@/lib/types/database";

export function AuthorForm({ author }: { author?: AuthorRow }) {
  const [avatarUrl, setAvatarUrl] = useState(author?.avatar_url ?? "");

  return (
    <form action={saveAuthor} className="max-w-lg space-y-4">
      {author?.id && <input type="hidden" name="id" value={author.id} />}
      <label className="block text-sm">
        Name *
        <input name="name" required defaultValue={author?.name} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Slug
        <input name="slug" defaultValue={author?.slug} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Role
        <input name="role" defaultValue={author?.role ?? ""} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Initials
        <input name="initials" defaultValue={author?.initials ?? ""} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Sector focus
        <input name="sector_focus" defaultValue={author?.sector_focus ?? ""} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        LinkedIn URL
        <input name="linkedin_url" type="url" defaultValue={author?.linkedin_url ?? ""} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <label className="block text-sm">
        Bio
        <textarea name="bio" rows={4} defaultValue={author?.bio ?? ""} className="mt-1 w-full border border-border px-3 py-2" />
      </label>
      <input type="hidden" name="avatar_url" value={avatarUrl} />
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const fd = new FormData();
          fd.set("bucket", "author-avatars");
          fd.set("file", f);
          const r = await uploadAdminFile(fd);
          if (r.url) setAvatarUrl(r.url);
        }}
      />
      {avatarUrl && <p className="truncate text-xs text-text-muted">{avatarUrl}</p>}
      <button type="submit" className="bg-midnight px-6 py-2 text-sm text-white">Save author</button>
    </form>
  );
}
