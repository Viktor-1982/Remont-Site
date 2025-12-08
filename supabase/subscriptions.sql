-- Создать таблицу подписок
create table if not exists public.subscriptions (
    email text primary key,
    locale text not null default 'ru',
    source text,
    subscribed_at timestamptz not null default now()
);

-- Индексы на locale для подсчётов
create index if not exists subscriptions_locale_idx on public.subscriptions (locale);

-- Ограничение на email
alter table public.subscriptions
    add constraint subscriptions_email_check check (length(email) > 3);

