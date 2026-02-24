-- Create categories table and connect it to posts table
-- Safe to run multiple times in Supabase SQL Editor

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at_categories()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_set_updated_at_categories on public.categories;
create trigger trg_set_updated_at_categories
before update on public.categories
for each row
execute function public.set_updated_at_categories();

-- Seed categories
insert into public.categories (name, slug, description)
values
  ('Corporate Strategy', 'corporate-strategy', 'Strategic direction, governance, and portfolio orchestration.'),
  ('Operations', 'operations', 'Operational excellence across production and distribution.'),
  ('Market', 'market', 'Market insights, channel growth, and commercial execution.'),
  ('Sustainability', 'sustainability', 'Long-term environmental and social value creation.')
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  updated_at = now();

-- Add FK column to posts
alter table public.posts
  add column if not exists category_id uuid;

-- Backfill category_id from existing text category column
update public.posts p
set category_id = c.id
from public.categories c
where lower(trim(p.category)) = lower(trim(c.name))
  and p.category_id is null;

-- Add foreign key constraint
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'posts_category_id_fkey'
      and conrelid = 'public.posts'::regclass
  ) then
    alter table public.posts
      add constraint posts_category_id_fkey
      foreign key (category_id)
      references public.categories(id)
      on update cascade
      on delete set null;
  end if;
end$$;

create index if not exists idx_posts_category_id on public.posts(category_id);

-- RLS
alter table public.categories enable row level security;

drop policy if exists "authenticated can read categories" on public.categories;
create policy "authenticated can read categories"
on public.categories
for select
to authenticated
using (true);

drop policy if exists "authenticated can insert categories" on public.categories;
create policy "authenticated can insert categories"
on public.categories
for insert
to authenticated
with check (true);

drop policy if exists "authenticated can update categories" on public.categories;
create policy "authenticated can update categories"
on public.categories
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated can delete categories" on public.categories;
create policy "authenticated can delete categories"
on public.categories
for delete
to authenticated
using (true);

