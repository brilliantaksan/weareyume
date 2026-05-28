/**
 * Seeds a fresh Supabase project with the current prototype content so the
 * live site looks identical on day one.
 *
 * Usage:
 *   1. Run supabase/migrations/0001_init.sql first (creates tables + RLS).
 *   2. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 *   3. npm run seed
 *
 * The service-role key bypasses RLS — this script is server-only and must
 * never run in the browser. Re-running it replaces the seeded rows.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  DEFAULT_CONTENT,
  DEFAULT_DEMOS,
  DEFAULT_SESSIONS,
  DEFAULT_GALLERY,
  DEFAULT_FAQS,
} from "../lib/content";

// Minimal .env.local loader (no dependency on dotenv).
function loadEnv() {
  try {
    const file = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of file.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    /* no .env.local — rely on real env */
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Add them to .env.local, then re-run `npm run seed`."
  );
  process.exit(1);
}

const sb = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// Strip the seed id so the DB assigns real uuids.
const strip = <T extends { id: string }>(rows: T[]) =>
  rows.map(({ id, ...rest }) => rest);

async function main() {
  console.log("Seeding site_content…");
  let { error } = await sb
    .from("site_content")
    .upsert({ id: 1, data: DEFAULT_CONTENT });
  if (error) throw error;

  for (const [table, rows] of [
    ["demos", DEFAULT_DEMOS],
    ["sessions", DEFAULT_SESSIONS],
    ["gallery_photos", DEFAULT_GALLERY],
    ["faqs", DEFAULT_FAQS],
  ] as const) {
    console.log(`Seeding ${table}…`);
    // Clear then insert so the table matches the prototype exactly.
    const del = await sb.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (del.error) throw del.error;
    const ins = await sb.from(table).insert(strip(rows as { id: string }[]));
    if (ins.error) throw ins.error;
  }

  console.log("Done. Your Supabase project now matches the prototype.");
}

main().catch((e) => {
  console.error("Seed failed:", e.message ?? e);
  process.exit(1);
});
