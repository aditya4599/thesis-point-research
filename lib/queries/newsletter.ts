import { createClient } from "@/lib/supabase/server";

export async function subscribeNewsletter(email: string) {
  const supabase = createClient();
  const normalized = email.trim().toLowerCase();

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: normalized });

  if (error) {
    if (error.code === "23505") {
      return { ok: false as const, error: "already_subscribed" as const };
    }
    throw error;
  }

  return { ok: true as const };
}
