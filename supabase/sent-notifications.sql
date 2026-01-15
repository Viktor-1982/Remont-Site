-- Создать таблицу для отслеживания отправленных уведомлений
create table if not exists public.sent_notifications (
    id uuid primary key default gen_random_uuid(),
    post_slug text not null,
    post_locale text not null,
    sent_at timestamptz not null default now(),
    subscribers_count integer not null default 0,
    success_count integer not null default 0,
    failed_count integer not null default 0,
    unique(post_slug, post_locale)
);

-- Индекс для быстрого поиска по slug и locale
create index if not exists sent_notifications_slug_locale_idx on public.sent_notifications (post_slug, post_locale);
create index if not exists sent_notifications_sent_at_idx on public.sent_notifications (sent_at);

