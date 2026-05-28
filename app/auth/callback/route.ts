import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/content";

// Exchanges the OAuth code for a session, then sends the user to /admin (or
// back to login with an error if they're not the allowlisted account).
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        return NextResponse.redirect(`${origin}/admin`);
      }
      // Wrong account: sign out and reject.
      await supabase.auth.signOut();
      return NextResponse.redirect(`${origin}/admin/login?error=not_allowed`);
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
