-- Add luma_event_id as the deduplication key for Luma-synced sessions.
-- Nullable so existing manually-created rows are untouched.
alter table public.sessions
  add column if not exists luma_event_id text unique;
