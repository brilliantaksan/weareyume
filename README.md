# Yu+Me — weareyume.com

A Socratica co-working node in Shibuya. Next.js (App Router) site with a
self-serve admin where the owner edits **all copy** plus four collections —
Demos, Sessions, Gallery photos, and FAQ — backed by Supabase.

The original design prototype lives in [`_design/`](./_design) for reference.

---

## Stack

- **Next.js 14** (App Router, TypeScript) — public pages server-render and read
  from Supabase, so edits appear without a redeploy.
- **Supabase** — Postgres (content), Storage (gallery photos), Auth (Google).
- **Vercel** — hosting + CI/CD from GitHub.

Content lives in `lib/content.ts` as `DEFAULT_*`. These doubles as (1) the seed
data and (2) a fallback the site renders if the database is ever unreachable —
so the page never breaks and looks identical on day one.

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase keys
npm run dev                  # http://localhost:3000
```

Without Supabase keys the site still renders from the built-in defaults; the
`/admin` page shows a "configure Supabase" hint.

Env vars (`.env.local`):

| Variable | Where it's used | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | browser + server | no |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser + server | no |
| `SUPABASE_SERVICE_ROLE_KEY` | `npm run seed` only | **yes — never commit / never expose to browser** |
| `NEXT_PUBLIC_ADMIN_EMAIL` | admin allowlist (defaults to hello@weareyume.com) | no |
| `NEXT_PUBLIC_SITE_URL` | OAuth redirect (e.g. https://weareyume.com) | no |

---

## Go-live runbook

Each numbered block is something **you** do in your own accounts. I've written
the code, schema, and seed; these are the credential/DNS steps only you can do.

### 1. Supabase project  *(project `poydyvtlqjinwnptmsws` already created)*

1. **SQL Editor → New query** → paste **all of
   [`supabase/setup.sql`](./supabase/setup.sql)** and run it. That one file
   creates the tables + RLS + the public `gallery` bucket **and** loads the
   prototype content in a single paste. (The admin email is pinned at the top
   of the file — change it there if it's ever not `hello@weareyume.com`.)
   - Schema only: [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql)
   - Seed only: [`supabase/seed.sql`](./supabase/seed.sql)
   - Alternatively, from a machine that can reach Supabase: `npm run seed`.
2. Keys are already wired into `.env.local` here (URL + anon + service_role).

### 2. Google sign-in

1. [Google Cloud Console](https://console.cloud.google.com) → create an OAuth
   **Web** client (APIs & Services → Credentials).
2. Authorized redirect URI — add exactly:
   ```
   https://poydyvtlqjinwnptmsws.supabase.co/auth/v1/callback
   ```
3. Copy the Google **Client ID** + **Client secret** into Supabase →
   **Authentication → Providers → Google**, and enable the provider.
4. Supabase → **Authentication → URL Configuration**: set **Site URL** to
   `https://weareyume.com` and add these to **Redirect URLs**:
   ```
   https://weareyume.com/auth/callback
   http://localhost:3000/auth/callback
   ```
5. Sign-in is locked to `hello@weareyume.com` two ways: Next.js middleware
   rejects any other session, and Postgres RLS denies writes from any other
   email. A stray Google account can sign in but can neither see the admin nor
   write anything.

### 3. GitHub  *(repo `brilliantaksan/weareyume`)*

```bash
git remote add origin https://github.com/brilliantaksan/weareyume.git
git push -u origin main
```

(The remote is already configured here. Pushing from this environment needs a
GitHub token — see the note at the end.)

### 4. Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → import the GitHub repo.
2. Add the env vars from the table above (all four `NEXT_PUBLIC_*`; the
   `SUPABASE_SERVICE_ROLE_KEY` is **not** needed in Vercel — it's only for
   local seeding). Set `NEXT_PUBLIC_SITE_URL=https://weareyume.com`.
3. Deploy.

### 5. DNS — the "DNS thingy" 🙂

In your **weareyume.com registrar's** DNS settings, add what Vercel shows you
under **Project → Settings → Domains** after you add `weareyume.com` + `www`.
It's one of two options (Vercel tells you the exact values):

- **A record** `@ → 76.76.21.21` **and CNAME** `www → cname.vercel-dns.com`, or
- switch your nameservers to Vercel's (it displays the two `ns*.vercel-dns.com`
  values).

DNS can take a few minutes to a few hours to propagate; Vercel issues HTTPS
automatically once it resolves.

---

## Editing the site (for the owner)

Go to **weareyume.com/admin**, sign in with the `hello@weareyume.com` Google
account, and edit:

- **Copy** — every line of text on the site (hero, manifesto, how-it-works,
  headings, footer links, etc.).
- **Demos / Sessions / Gallery / FAQ** — add, edit, reorder (↑/↓), delete.
  For Gallery, upload a photo and it lands in Supabase Storage; mark a session
  as "next" with the radio button.

Hit the **Save** button in each tab. Changes are live immediately.

---

## Security notes

- Admin is gated by **middleware** (`middleware.ts`) *and* **RLS** — belt and
  suspenders.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only; it's in `.gitignore` and must
  never reach the browser or a commit.
- This runs **Next.js 14.2.35**. It's patched against the critical advisories;
  a few DoS-class image-optimizer advisories are only fully resolved in Next 15/16
  (a breaking major bump). Vercel mitigates the image issue in practice — plan a
  bump to 15/16 when convenient.
