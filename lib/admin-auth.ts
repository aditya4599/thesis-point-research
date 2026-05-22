import { cookies } from "next/headers";

const COOKIE_NAME = "tp_admin_session";

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token === process.env.ADMIN_SECRET;
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}
