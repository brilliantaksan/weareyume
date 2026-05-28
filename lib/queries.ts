import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_CONTENT,
  DEFAULT_DEMOS,
  DEFAULT_GALLERY,
  DEFAULT_FAQS,
  DEFAULT_SESSIONS,
  type SiteContent,
  type Demo,
  type SessionRow,
  type GalleryPhoto,
  type Faq,
} from "@/lib/content";

// Returns true once the public Supabase env vars are present. Lets the site
// render from defaults during local setup before keys are wired up.
function configured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export type SiteData = {
  content: SiteContent;
  demos: Demo[];
  sessions: SessionRow[];
  gallery: GalleryPhoto[];
  faqs: Faq[];
};

export async function getSiteData(): Promise<SiteData> {
  const fallback: SiteData = {
    content: DEFAULT_CONTENT,
    demos: DEFAULT_DEMOS,
    sessions: DEFAULT_SESSIONS,
    gallery: DEFAULT_GALLERY,
    faqs: DEFAULT_FAQS,
  };

  if (!configured()) return fallback;

  try {
    const supabase = createClient();
    const [contentRes, demosRes, sessionsRes, galleryRes, faqsRes] =
      await Promise.all([
        supabase.from("site_content").select("data").eq("id", 1).maybeSingle(),
        supabase.from("demos").select("*").order("sort_order"),
        supabase.from("sessions").select("*").order("sort_order"),
        supabase.from("gallery_photos").select("*").order("sort_order"),
        supabase.from("faqs").select("*").order("sort_order"),
      ]);

    return {
      content: (contentRes.data?.data as SiteContent) ?? DEFAULT_CONTENT,
      demos: demosRes.data?.length ? (demosRes.data as Demo[]) : DEFAULT_DEMOS,
      sessions: sessionsRes.data?.length
        ? (sessionsRes.data as SessionRow[])
        : DEFAULT_SESSIONS,
      gallery: galleryRes.data?.length
        ? (galleryRes.data as GalleryPhoto[])
        : DEFAULT_GALLERY,
      faqs: faqsRes.data?.length ? (faqsRes.data as Faq[]) : DEFAULT_FAQS,
    };
  } catch {
    return fallback;
  }
}

// Public URL for a gallery photo stored in the `gallery` bucket.
export function galleryPublicUrl(path: string | null): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/gallery/${path}`;
}
