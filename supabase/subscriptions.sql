-- Create the newsletter subscriptions table.
create table if not exists public.subscriptions (
    email text primary key,
    locale text not null default 'ru',
    segment text,
    source text,
    subscribed_at timestamptz not null default now()
);

alter table public.subscriptions
    add column if not exists segment text;

create index if not exists subscriptions_locale_idx on public.subscriptions (locale);
create index if not exists subscriptions_segment_idx on public.subscriptions (segment);

do $$
begin
    if not exists (
        select 1
        from pg_constraint
        where conname = 'subscriptions_email_check'
          and conrelid = 'public.subscriptions'::regclass
    ) then
        alter table public.subscriptions
            add constraint subscriptions_email_check check (length(email) > 3);
    end if;
end
$$;
