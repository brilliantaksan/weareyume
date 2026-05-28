import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_EMAIL } from "@/lib/content";

// Refreshes the auth session on every request and guards /admin so that only
// the allowlisted email may enter. /admin/login stays public so an
// unauthenticated owner can reach the sign-in button.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options?: CookieOptions }[]
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdminArea = path.startsWith("/admin");
  const isLogin = path === "/admin/login";

  if (isAdminArea && !isLogin) {
    const email = user?.email?.toLowerCase();
    if (!user || email !== ADMIN_EMAIL.toLowerCase()) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set(
        "error",
        user ? "not_allowed" : "signin_required"
      );
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
