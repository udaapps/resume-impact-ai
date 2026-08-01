-- Run once in the Supabase SQL Editor before replacing the app files.
-- Soft delete keeps daily AI usage counts intact while hiding deleted history.

alter table public.analytics_ai_summaries
  add column if not exists deleted_at timestamptz;

create index if not exists analytics_ai_summaries_active_history_idx
  on public.analytics_ai_summaries (user_id, generated_at desc)
  where deleted_at is null;

comment on column public.analytics_ai_summaries.deleted_at is
  'Soft-delete timestamp. Null means the summary is visible in history.';
