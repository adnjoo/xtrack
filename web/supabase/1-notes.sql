create table notes (
  id bigserial primary key,
  title text,
  user_id uuid references auth.users(id) on delete cascade
);