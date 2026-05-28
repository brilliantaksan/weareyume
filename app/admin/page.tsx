import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_CONTENT,
  type SiteContent,
  type Demo,
  type SessionRow,
  type GalleryPhoto,
  type Faq,
} from "@/lib/content";
import { AdminApp } from "@/components/admin/AdminApp";
import "./admin.css";

export const dynamic = "force-dynamic";

function configured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export default async function AdminPage() {
  if (!configured()) {
    return (
      <div className="adm">
        <div className="adm-wrap">
          <div className="adm-hint">
            Supabase isn&apos;t configured yet. Add{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to your environment, run
            the SQL migration + seed, then reload.
          </div>
        </div>
      </div>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [contentRes, demosRes, sessionsRes, galleryRes, faqsRes] =
    await Promise.all([
      supabase.from("site_content").select("data").eq("id", 1).maybeSingle(),
      supabase.from("demos").select("*").order("sort_order"),
      supabase.from("sessions").select("*").order("sort_order"),
      supabase.from("gallery_photos").select("*").order("sort_order"),
      supabase.from("faqs").select("*").order("sort_order"),
    ]);

  const content = (contentRes.data?.data as SiteContent) ?? DEFAULT_CONTENT;

  return (
    <AdminApp
      email={user?.email ?? ""}
      initialContent={content}
      initialDemos={(demosRes.data as Demo[]) ?? []}
      initialSessions={(sessionsRes.data as SessionRow[]) ?? []}
      initialGallery={(galleryRes.data as GalleryPhoto[]) ?? []}
      initialFaqs={(faqsRes.data as Faq[]) ?? []}
    />
  );
}
