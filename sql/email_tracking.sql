-- ============================================================================
-- Email tracking for Brevo cold-email campaigns
-- Run this once in Supabase → SQL Editor
-- ============================================================================

create table public.email_events (
  id uuid not null default gen_random_uuid (),
  contact_email text not null,
  event_type text not null,           -- 'sent' | 'delivered' | 'opened' | 'clicked' | 'hard_bounce' | 'soft_bounce' | 'spam' | 'unsubscribed'
  subject text null,
  message_id text null,               -- Brevo's "mid" field, links related events together
  link_clicked text null,             -- only set for 'clicked' events
  raw_payload jsonb null,             -- full webhook body, kept for debugging
  event_at timestamp with time zone not null,  -- when Brevo says it happened (their "ts")
  created_at timestamp with time zone null default now(),  -- when we received the webhook
  followed_up_at timestamp with time zone null,  -- set manually from the admin panel once you've replied
  constraint email_events_pkey primary key (id)
) TABLESPACE pg_default;

create index IF not exists idx_email_events_contact on public.email_events using btree (contact_email);
create index IF not exists idx_email_events_type on public.email_events using btree (event_type);
create index IF not exists idx_email_events_event_at on public.email_events using btree (event_at desc);
create index IF not exists idx_email_events_message_id on public.email_events using btree (message_id);

-- ── View: latest status per contact ────────────────────────────────────────
-- Ranks event_type by "how far along" it is, so each contact shows their
-- most advanced status, not just whatever event happened most recently
-- (e.g. a "delivered" logged after a "clicked" shouldn't downgrade them).
create or replace view public.email_contact_status as
select distinct on (contact_email)
  contact_email,
  subject,
  event_type as latest_status,
  event_at as latest_event_at,
  message_id,
  link_clicked,
  followed_up_at
from public.email_events
order by
  contact_email,
  case event_type
    when 'clicked' then 5
    when 'opened' then 4
    when 'delivered' then 3
    when 'sent' then 2
    else 1
  end desc,
  event_at desc;
