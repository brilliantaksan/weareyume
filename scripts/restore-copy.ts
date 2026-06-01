/**
 * Pushes the simplified copy from lib/content.ts into Supabase WITHOUT touching
 * demos / sessions / gallery rows (so any admin-uploaded photos or custom demos
 * are preserved). Updates the site_content copy blob and refreshes the FAQ list.
 *
 *   npm run restore-copy
 *
 * Needs NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { DEFAULT_CONTENT, DEFAULT_FAQS } from "../lib/content";

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
    /* rely on real env */
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local."
  );
  process.exit(1);
}

const sb = createClient(url, serviceKey, { auth: { persistSession: false } });

async function main() {
  console.log("Updating site_content (copy)…");
  const { error: contentErr } = await sb
    .from("site_content")
    .upsert({ id: 1, data: DEFAULT_CONTENT });
  if (contentErr) throw contentErr;

  console.log("Refreshing faqs…");
  const del = await sb
    .from("faqs")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (del.error) throw del.error;
  const ins = await sb
    .from("faqs")
    .insert(DEFAULT_FAQS.map(({ id, ...rest }) => rest));
  if (ins.error) throw ins.error;

  console.log("Done. demos / sessions / gallery were left untouched.");
}

main().catch((e) => {
  console.error("restore-copy failed:", e.message ?? e);
  process.exit(1);
});
