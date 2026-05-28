import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Run on admin routes + auth callback. Skip static assets and the public
    // site (which doesn't need session refresh for read-only content).
    "/admin/:path*",
    "/auth/:path*",
  ],
};
