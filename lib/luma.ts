/* eslint-disable @typescript-eslint/no-explicit-any */

// Fetches upcoming Yu+Me events by parsing the embedded JSON from the public
// Luma calendar page — no API key required.
//
// Luma obfuscates venue addresses on public pages (shown only after RSVP), so
// location falls back to the DEFAULT_LOCATION env var (set to your usual venue).
// Capacity isn't exposed publicly either, so spots text defaults to "RSVP on Luma".

const LUMA_CALENDAR_URL = "https://lu.ma/yume";

type LumaPageEvent = {
  api_id: string;
  name: string;
  start_at: string;
  url: string; // slug only, e.g. "ucdujbu2" → prepend https://lu.ma/
  geo_address_info?: {
    city_state?: string;
    region?: string;
    city?: string;
  } | null;
  waitlist_status?: string;
};

// ── Parsers ───────────────────────────────────────────────────────────────────

function toDateLabel(iso: string): string {
  const d = new Date(iso);
  const dd = d.toLocaleString("en-US", { day: "2-digit", timeZone: "Asia/Tokyo" });
  const mm = d.toLocaleString("en-US", { month: "2-digit", timeZone: "Asia/Tokyo" });
  return `${dd}.${mm}`;
}

function toDayLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "Asia/Tokyo",
  });
}

function toLocation(geo: LumaPageEvent["geo_address_info"]): string {
  // Address is obfuscated on public pages — fall back to env var (e.g. "Cr/pto Café, Shibuya")
  const fallback = process.env.LUMA_DEFAULT_LOCATION ?? "Shibuya, Tokyo";
  if (!geo) return fallback;
  // Use city + region if available, otherwise fallback
  const city = geo.city ?? "";
  const region = geo.region ?? "";
  if (city && region && city !== region) return `${city}, ${region}`;
  if (region) return region;
  return fallback;
}

// ── Public page scraper ───────────────────────────────────────────────────────

async function fetchLumaEvents(): Promise<LumaPageEvent[]> {
  const res = await fetch(LUMA_CALENDAR_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch Luma calendar page: ${res.status}`);
  }
  const html = await res.text();

  // Luma embeds JSON event data directly in the page HTML.
  // Each event appears as: "event":{"api_id":"evt-...","name":"...","start_at":"...",...}
  const events: LumaPageEvent[] = [];
  const pattern = /"api_id":"(evt-[^"]+)","calendar_api_id":"[^"]*","[^}]*"name":"([^"]+)"[^}]*"start_at":"([^"]+)"[^}]*"[^}]*"url":"([^"]+)"/g;

  // More reliable: extract event JSON blobs by finding api_id and getting surrounding context
  const seen = new Set<string>();
  let idx = 0;
  while (true) {
    const match = html.indexOf('"api_id":"evt-', idx);
    if (match === -1) break;
    idx = match + 1;

    // Get a 1200-char window around the match — enough for one event object
    const chunk = html.slice(Math.max(0, match - 20), match + 1200);

    // Extract individual fields with simple regex
    const apiId = chunk.match(/"api_id":"(evt-[^"]+)"/)?.[1];
    const name = chunk.match(/"name":"([^"]+)"/)?.[1];
    const startAt = chunk.match(/"start_at":"([^"]+)"/)?.[1];
    const url = chunk.match(/"url":"([a-z0-9]+)"/)?.[1]; // slug only
    const calendarId = chunk.match(/"calendar_api_id":"([^"]+)"/)?.[1];

    if (!apiId || !name || !startAt || !url || !calendarId) continue;
    // Only include events belonging to our calendar
    if (calendarId !== (process.env.LUMA_CALENDAR_ID ?? "cal-IVaQNaQwNaI0FC9")) continue;
    if (seen.has(apiId)) continue;
    seen.add(apiId);

    // Extract geo info if present
    const geoMatch = chunk.match(/"geo_address_info":\{([^}]+)\}/);
    let geo: LumaPageEvent["geo_address_info"] = null;
    if (geoMatch) {
      const city = geoMatch[1].match(/"city":"([^"]+)"/)?.[1];
      const region = geoMatch[1].match(/"region":"([^"]+)"/)?.[1];
      const cityState = geoMatch[1].match(/"city_state":"([^"]+)"/)?.[1];
      geo = { city, region, city_state: cityState };
    }

    const waitlistStatus = chunk.match(/"waitlist_status":"([^"]+)"/)?.[1];

    events.push({ api_id: apiId, name, start_at: startAt, url, geo_address_info: geo, waitlist_status: waitlistStatus });
  }

  return events;
}

// ── Core sync function ────────────────────────────────────────────────────────

export async function syncLumaEvents(
  supabaseService: any
): Promise<{ synced: number; errors: string[] }> {
  const allEvents = await fetchLumaEvents();
  const errors: string[] = [];
  const now = new Date();

  // Only upcoming events, sorted chronologically
  const upcoming = allEvents
    .filter((e) => new Date(e.start_at) > now)
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());

  const nextIndex = 0; // first upcoming is always "next"

  for (let i = 0; i < upcoming.length; i++) {
    const event = upcoming[i];
    const row = {
      luma_event_id: event.api_id,
      date_label: toDateLabel(event.start_at),
      day: toDayLabel(event.start_at),
      title: event.name,
      location: toLocation(event.geo_address_info),
      spots: event.waitlist_status === "open" ? "Waitlist open" : "RSVP on Luma",
      luma_url: `https://lu.ma/${event.url}`,
      is_next: i === nextIndex,
      sort_order: i,
    };

    const { error } = await supabaseService
      .from("sessions")
      .upsert(row, { onConflict: "luma_event_id" });

    if (error) errors.push(`Event ${event.api_id}: ${error.message}`);
  }

  // Remove Luma-synced rows whose events are no longer on the public page.
  // Manual rows (luma_event_id IS NULL) are never touched.
  if (upcoming.length > 0) {
    const activeIds = upcoming.map((e) => e.api_id);
    const { error } = await supabaseService
      .from("sessions")
      .delete()
      .not("luma_event_id", "is", null)
      .not("luma_event_id", "in", `(${activeIds.join(",")})`);

    if (error) errors.push(`Cleanup: ${error.message}`);
  }

  return { synced: upcoming.length, errors };
}
