-- Safe migration for existing `public.posts` table.
-- Run this in Supabase SQL Editor if your table already exists
-- and app expects full CMS fields.

create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image_url text not null default '',
  category text not null default 'Corporate Strategy',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts add column if not exists excerpt text not null default '';
alter table public.posts add column if not exists content text not null default '';
alter table public.posts add column if not exists cover_image_url text not null default '';
alter table public.posts add column if not exists category text not null default 'Corporate Strategy';
alter table public.posts add column if not exists status text not null default 'draft';
alter table public.posts add column if not exists published_at date;
alter table public.posts add column if not exists created_at timestamptz not null default now();
alter table public.posts add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'posts_status_check'
      and conrelid = 'public.posts'::regclass
  ) then
    alter table public.posts
      add constraint posts_status_check check (status in ('draft', 'published'));
  end if;
end$$;

create unique index if not exists idx_posts_slug_unique on public.posts(slug);

create or replace function public.set_updated_at_posts()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_posts on public.posts;
create trigger trg_set_updated_at_posts
before update on public.posts
for each row
execute function public.set_updated_at_posts();

alter table public.posts enable row level security;

drop policy if exists "authenticated can read posts" on public.posts;
create policy "authenticated can read posts"
on public.posts
for select
to authenticated
using (true);

drop policy if exists "authenticated can insert posts" on public.posts;
create policy "authenticated can insert posts"
on public.posts
for insert
to authenticated
with check (true);

drop policy if exists "authenticated can update posts" on public.posts;
create policy "authenticated can update posts"
on public.posts
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated can delete posts" on public.posts;
create policy "authenticated can delete posts"
on public.posts
for delete
to authenticated
using (true);

-- Dummy published data for immediate rendering
insert into public.posts (
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  category,
  status,
  published_at
)
values
(
  'Building Resilient Industrial Value Chains',
  'building-resilient-industrial-value-chains',
  'How governance alignment and operational discipline reinforce long-term performance across core sectors.',
  'Resilience in industrial ecosystems is no longer optional. It is built through governance clarity, disciplined investment, and cross-sector collaboration.\n\nAt Adibayu Group, value creation begins with strong operational foundations and clear strategic accountability.\n\nThis approach enables faster adaptation to market shifts while preserving execution quality.',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  'Corporate Strategy',
  'published',
  '2026-02-10'
),
(
  'Distribution Excellence in Fragmented Markets',
  'distribution-excellence-in-fragmented-markets',
  'Practical frameworks to improve reliability, speed, and cost control in national distribution networks.',
  'Distribution performance determines whether strategic intent becomes market reality.\n\nLeading groups optimize network design and inventory synchronization.\n\nThe result is stronger market access and improved resilience under volatility.',
  'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80',
  'Operations',
  'published',
  '2026-02-05'
),
(
  'Retail Performance Through Operating Rhythm',
  'retail-performance-through-operating-rhythm',
  'A disciplined operating cadence helps retail organizations scale quality while protecting brand consistency.',
  'Retail growth is sustainable when operating rhythm is clear.\n\nFrom category planning to in-store standards, each process must support a consistent customer experience.',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
  'Market',
  'published',
  '2026-01-30'
)
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  cover_image_url = excluded.cover_image_url,
  category = excluded.category,
  status = excluded.status,
  published_at = excluded.published_at,
  updated_at = now();

