create table events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  path text,
  utm jsonb,
  meta_data jsonb,
  created_at timestamp with time zone default now()
);

create table generations (
  id uuid primary key default gen_random_uuid(),
  seed_text text not null,
  audience text,
  tone text,
  platforms text[],
  output jsonb,
  created_at timestamp with time zone default now()
);

alter table events enable row level security;
alter table generations enable row level security;

create policy "Allow anon insert events"
on events
for insert
to anon
with check (true);

create policy "Allow anon select events"
on events
for select
to anon
using (true);

create policy "Allow anon insert generations"
on generations
for insert
to anon
with check (true);

create policy "Allow anon select generations"
on generations
for select
to anon
using (true);