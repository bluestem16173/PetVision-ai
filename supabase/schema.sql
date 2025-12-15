-- Create videos table
create table videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  r2_key text not null unique,
  filename text not null,
  content_type text not null,
  size_bytes bigint not null,
  status text not null default 'uploaded',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table videos enable row level security;

-- Policy: Users can SELECT only their own videos
create policy "Users can select their own videos"
  on videos
  for select
  using (auth.uid() = user_id);

-- Policy: Users can INSERT only their own videos
create policy "Users can insert their own videos"
  on videos
  for insert
  with check (auth.uid() = user_id);

-- Policy: Users can UPDATE only their own videos
create policy "Users can update their own videos"
  on videos
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policy: Users can DELETE only their own videos
create policy "Users can delete their own videos"
  on videos
  for delete
  using (auth.uid() = user_id);

