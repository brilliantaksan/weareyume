-- Yu+Me site schema: content tables, RLS, and the gallery storage bucket.
--
-- Run this in the Supabase SQL editor (or via `supabase db push`). It is
-- idempotent enough to re-run safely on a fresh project.
--
-- Access model:
--   * Everyone (anon) can SELECT — the public site reads with the anon key.
--   * Only the allowlisted admin email can INSERT/UPDATE/DELETE.
-- The admin email is read from the `app.admin_email` GUC so it lives in one
-- place; set it once below (and keep it in sync with NEXT_PUBLIC_ADMIN_EMAIL).

-- 1. Pin the admin email for this database.
alter database postgres set app.admin_email = 'hello@weareyume.com';

-- Helper: is the current request the admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    lower(auth.jwt() ->> 'email') = lower(current_setting('app.admin_email', true)),
    false
  );
$$;

-- 2. Tables ------------------------------------------------------------------

create table if not exists public.site_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

create table if not exists public.demos (
  id uuid primary key default gen_random_uuid(),
  tag text not null default '',
  title text not null default '',
  maker text not null default '',
  body text not null default '',
  color text not null default 'sky',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  date_label text not null default '',
  day text not null default '',
  title text not null default '',
  location text not null default '',
  spots text not null default '',
  luma_url text not null default '',
  is_next boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  image_path text,
  date_label text not null default '',
  tilt text not null default '0deg',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null default '',
  answer text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- 3. Row Level Security ------------------------------------------------------

alter table public.site_content   enable row level security;
alter table public.demos          enable row level security;
alter table public.sessions       enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.faqs           enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['site_content', 'demos', 'sessions', 'gallery_photos', 'faqs']
  loop
    execute format('drop policy if exists %I on public.%I', t || '_read',  t);
    execute format('drop policy if exists %I on public.%I', t || '_write', t);

    execute format(
      'create policy %I on public.%I for select using (true)',
      t || '_read', t
    );
    execute format(
      'create policy %I on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',
      t || '_write', t
    );
  end loop;
end $$;

-- 4. Storage bucket for gallery photos --------------------------------------

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

drop policy if exists "gallery read"   on storage.objects;
drop policy if exists "gallery write"  on storage.objects;
drop policy if exists "gallery update" on storage.objects;
drop policy if exists "gallery delete" on storage.objects;

create policy "gallery read" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "gallery write" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "gallery update" on storage.objects
  for update to authenticated
  using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "gallery delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'gallery' and public.is_admin());
