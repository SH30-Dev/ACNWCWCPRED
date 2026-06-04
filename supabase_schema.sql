-- Run this in your Supabase SQL editor to set up the database

-- Submissions table: one row per participant
create table if not exists submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  first_name text not null,
  last_name  text not null,
  team_name  text,
  group_scores jsonb default '{}',   -- { "1": {"s1":2,"s2":1}, ... }
  ko_winners   jsonb default '{}',   -- { "M73": "Brazil", ... }
  bonus        jsonb default '{}'    -- { "scorer":"Lukaku","redcard":"Belgium",... }
);

-- Admin state table: one row for actual results (id always = 1)
create table if not exists admin_state (
  id          int primary key default 1,
  actual_scores jsonb default '{}',  -- { "1": {"s1":2,"s2":1}, ... }
  ko_winners    jsonb default '{}',  -- { "M73": "Brazil", ... }
  bonus_actual  jsonb default '{}'   -- { "scorer":"Lukaku","scorerGoals":5,... }
);

-- Insert the single admin row if not exists
insert into admin_state (id) values (1) on conflict (id) do nothing;

-- Enable Row Level Security but allow all reads (public leaderboard)
alter table submissions enable row level security;
alter table admin_state  enable row level security;

-- Policy: anyone can read submissions and admin_state
create policy "Public read submissions"   on submissions   for select using (true);
create policy "Public read admin_state"   on admin_state   for select using (true);

-- Policy: anyone can insert a submission
create policy "Anyone can submit"         on submissions   for insert with check (true);

-- Policy: admin_state can be updated by anyone (we protect via admin password in the app)
create policy "Anyone can update admin"   on admin_state   for update using (true);
create policy "Anyone can insert admin"   on admin_state   for insert with check (true);

-- Enable realtime on both tables
alter publication supabase_realtime add table submissions;
alter publication supabase_realtime add table admin_state;
