import { NextResponse } from "next/server";
import { syncLumaEvents } from "@/lib/luma";
import { createServiceClient } from "@/lib/supabase/service";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/content";

async function handle(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const syncSecret = process.env.SYNC_SECRET;
  const cronSecret = process.env.CRON_SECRET;

  const isSecret =
    (syncSecret && auth === `Bearer ${syncSecret}`) ||
    (cronSecret && auth === `Bearer ${cronSecret}`);

  if (!isSecret) {
    // Fall back to checking if the caller is the logged-in admin user
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const sb = createClient();
    const { data: { user } } = await sb.auth.getUser(token);
    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const supabase = createServiceClient();
    const result = await syncLumaEvents(supabase);

    if (result.errors.length > 0) {
      console.error("[sync-luma] Partial errors:", result.errors);
    }

    return NextResponse.json({
      ok: true,
      synced: result.synced,
      errors: result.errors,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[sync-luma] Fatal:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// POST: called by admin panel and webhook
export async function POST(request: Request) {
  return handle(request);
}

// GET: Vercel Cron on Hobby plan uses GET
export async function GET(request: Request) {
  return handle(request);
}
