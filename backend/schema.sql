-- Run this once in your Supabase project's SQL Editor
-- (Supabase dashboard → SQL Editor → New query → paste → Run)

create table if not exists push_subscriptions (
  id bigint generated always as identity primary key,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Speeds up the scheduler's "get all active subscriptions" query.
create index if not exists idx_push_subscriptions_endpoint
  on push_subscriptions (endpoint);

-- Tracks which dates have already had their daily notification sent,
-- so the scheduler is idempotent even if triggered twice in one day
-- (a retried GitHub Actions run, a manual re-trigger, etc).
create table if not exists sent_log (
  date date primary key,
  sent_at timestamptz not null default now()
);
