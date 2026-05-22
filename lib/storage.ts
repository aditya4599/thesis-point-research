import { createAdminClient } from "@/lib/supabase/admin";

export type StorageBucket =
  | "pdfs"
  | "report-thumbnails"
  | "company-logos"
  | "author-avatars";

export async function uploadFile(
  bucket: StorageBucket,
  path: string,
  file: File | Blob,
  contentType?: string
) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      contentType: contentType ?? file.type,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}

export function getPublicUrl(bucket: StorageBucket, path: string) {
  const supabase = createAdminClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
