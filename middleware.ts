import { NextResponse, type NextRequest } from "next/server";

// Edge-safe gate. We deliberately do NOT instantiate the Supabase SDK here —
// it transitively pulls Node-only modules (realtime/ws) that the Edge runtime
// can't bundle. Instead we do a cheap check for the presence of a Supabase auth
// cookie and bounce anonymous visitors away from /admin. The real allowlist
// enforcement (email must equal the admin) happens in the /admin server
// component, which runs on the Node runtime, plus Postgres RLS.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const hasSession = request.cookies
      .getAll()
      .some((c) => c.name.includes("-auth-token") && c.value);

    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "signin_required");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
