import { createClient } from "@supabase/supabase-js";

// Service-role client — bypasses RLS. ONLY use in server-side API routes.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var missing"
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
