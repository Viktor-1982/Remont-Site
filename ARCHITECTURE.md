# 🏗️ Архитектура проекта Renohacks.com

## Обзор

**Renohacks.com** — двуязычный блог о ремонте и DIY, построенный на Next.js 15 с использованием Contentlayer для управления контентом.

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                              │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE (middleware.ts)                     │
│  • Обработка языковых префиксов (/ru/ = RU, без префикса = EN)    │
│  • Редиректы (/en/* → /*, /tags/кириллица → /ru/tags/кириллица)   │
│  • Пропуск API, статических файлов, sitemap, robots.txt          │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                            │
│                                                                   │
│  ┌──────────────────────┐      ┌──────────────────────┐        │
│  │  src/app/(en)         │      │  src/app/(ru)/ru      │        │
│  │  (английский)         │      │  (русский)            │        │
│  │  - page.tsx           │      │  - page.tsx           │        │
│  │  - layout.tsx         │      │  - layout.tsx         │        │
│  │  - posts/[slug]/      │      │  - posts/[slug]/      │        │
│  │  - calculators/       │      │  - calculators/       │        │
│  │  - tags/[slug]/       │      │  - tags/[slug]/       │        │
│  │  - search/            │      │  - search/            │        │
│  │  - bookmarks/         │      │  - smety/            │        │
│  └──────────────────────┘      └──────────────────────┘        │
│                                                                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APP SHELL (app-shell.tsx)                     │
│  • ThemeProvider (тёмная/светлая тема)                          │
│  • SiteHeader (навигация, поиск, языки)                         │
│  • SiteFooter                                                   │
│  • CookieConsent                                                │
│  • Analytics (Vercel Analytics, Speed Insights)                │
│  • GTM + Yandex Metrika (при согласии)                          │
│  • PWA Service Worker                                            │
└──────────────────────────────┬──────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   COMPONENTS  │    │   CONTENT     │    │      API      │
└───────────────┘    └───────────────┘    └───────────────┘
```

---

## 📁 Структура проекта

### 1. Contentlayer (Управление контентом)

```
contentlayer.config.ts
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│                  content/posts/                          │
│                                                          │
│  ├── *.mdx (русские статьи)                             │
│  │   ├── gipsokarton-bez-treshchin-knauf-gid.mdx       │
│  │   ├── zvukoizolyaciya-kvartiry-2026.mdx              │
│  │   └── ... (50+ статей)                               │
│                                                          │
│  └── en/*.mdx (английские статьи)                       │
│      ├── 5-common-renovation-mistakes.mdx               │
│      └── ... (переводы)                                 │
└─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│            .contentlayer/generated/                     │
│  • allPosts (TypeScript типы для всех статей)          │
│  • Компилированные MDX → JSON/JS                       │
└─────────────────────────────────────────────────────────┘
```

**Frontmatter статьи:**
```yaml
---
title: "Как сделать стяжку пола"
description: "Пошаговый гайд..."
date: 2025-08-25
tags: ["ремонт", "пол"]
cover: "/images/styazhka/cover.png"
author: "Viktor Mezhakov"
rubric: "полы"
series: "этапы ремонта"
draft: false
---
```

**Вычисляемые поля:**
- `locale` — язык (ru/en)
- `slug` — URL slug
- `url` — полный URL
- `readingTime` — время чтения (180 слов/мин для RU, 200 для EN)
- `headings` — оглавление для TableOfContents

---

### 2. Компоненты UI

```
src/components/
│
├── Лейаут
│   ├── site-header.tsx          (навигация, поиск, переключатель языка)
│   ├── site-footer.tsx          (футер с ссылками)
│   └── theme-switcher.tsx       (тёмная/светлая тема)
│
├── Статьи
│   ├── article-card.tsx         (карточка статьи)
│   ├── article-grid.tsx         (сетка статей)
│   ├── article-hero.tsx         (герой-секция статьи)
│   ├── article-filters.tsx      (фильтры по тегам/рубрикам)
│   ├── table-of-contents.tsx    (оглавление)
│   ├── reading-progress.tsx     (прогресс чтения)
│   └── related-posts.tsx        (похожие статьи)
│
├── MDX
│   ├── mdx-components.tsx       (компоненты для MDX)
│   ├── mdx-renderer.tsx         (рендерер MDX)
│   └── mdx-content.tsx          (обёртка для контента)
│
├── Калькуляторы (widgets/)
│   ├── paint-calculator.tsx     (расчёт краски)
│   ├── tile-calculator.tsx      (расчёт плитки)
│   ├── wallpaper-calculator.tsx (расчёт обоев)
│   ├── flooring-calculator.tsx (напольные покрытия)
│   ├── drywall-calculator.tsx   (гипсокартон)
│   ├── soundproofing-calculator.tsx (звукоизоляция)
│   ├── screed-calculator.tsx    (стяжка пола)
│   ├── lighting-calculator.tsx  (освещение)
│   ├── ventilation-calculator.tsx (вентиляция)
│   ├── underfloor-heating-calculator.tsx (тёплый пол)
│   ├── renovation-budget-planner.tsx (бюджет ремонта)
│   └── ... (19 калькуляторов)
│
├── Интерактивное
│   ├── search-bar.tsx           (поиск по статьям)
│   ├── email-subscription.tsx  (подписка на email)
│   ├── bookmark-button.tsx      (закладки)
│   ├── view-history.tsx         (история просмотров)
│   ├── interior-style-quiz.tsx  (квиз стиля интерьера)
│   └── materials-checklist.tsx (чек-лист материалов)
│
└── UI-kit (ui/)
    ├── button.tsx
    ├── dialog.tsx
    ├── dropdown-menu.tsx
    └── ... (shadcn/ui компоненты)
```

---

### 3. Утилиты и библиотеки

```
src/lib/
│
├── article-tools.ts             (инструменты для статей)
├── article-series.ts            (серии статей)
├── article-rubrics.ts           (рубрики)
├── tags.ts                      (работа с тегами)
├── calculations.ts              (логика калькуляторов)
├── subscriptions-repo.ts        (подписки на email)
├── subscriptions-segments.ts    (сегментация подписчиков)
├── rate-limit.ts                (rate limiting)
├── seo.ts                       (SEO-утилиты)
├── indexnow.ts                  (IndexNow API)
├── supabase-admin.ts            (Supabase клиент)
├── utils.ts                     (общие утилиты)
└── use-bookmarks.ts             (хук для закладок)
```

---

### 4. API маршруты

```
src/app/api/
│
├── posts/route.ts               (GET: список статей для поиска)
├── subscribe/route.ts           (POST: подписка на email)
├── unsubscribe/route.ts        (POST: отписка)
├── subscriptions/route.ts       (GET: список подписок)
├── notify-subscribers/route.ts  (POST: уведомление подписчиков)
├── indexnow/route.ts            (POST: уведомление поисковиков)
├── switch-target/route.ts      (POST: смена целевой аудитории)
└── chat/route.ts                (POST: AI чат)
```

---

### 5. База данных (Supabase)

```
supabase/
│
├── subscriptions.sql            (таблица подписок)
│   ├── id
│   ├── email
│   ├── segments (jsonb)
│   ├── subscribed_at
│   └── unsubscribed_at
│
└── sent-notifications.sql       (таблица отправленных уведомлений)
    ├── id
    ├── post_id
    ├── segment
    ├── sent_at
    └── recipient_count
```

---

## 🔄 Поток данных

### 1. Запрос страницы статьи

```
User Request: /ru/posts/gipsokarton-bez-treshchin
        │
        ▼
Middleware → проверка префикса /ru/
        │
        ▼
src/app/(ru)/ru/posts/[slug]/page.tsx
        │
        ├─→ allPosts.find(post => post.slug === 'gipsokarton-bez-treshchin')
        │   (из .contentlayer/generated)
        │
        ├─→ ArticleHero (заголовок, обложка, метаданные)
        │
        ├─→ MDXRenderer (рендер контента)
        │   └─→ mdx-components.tsx (кастомные компоненты MDX)
        │
        ├─→ TableOfContents (оглавление)
        │
        ├─→ RelatedPosts (похожие статьи)
        │
        └─→ EmailSubscription (форма подписки)
```

### 2. Поиск статей

```
User: вводит запрос в SearchBar
        │
        ▼
src/components/search-bar.tsx
        │
        ├─→ fetch('/api/posts?q=запрос')
        │
        ▼
src/app/api/posts/route.ts
        │
        ├─→ allPosts.filter(post =>
        │       post.title.includes(query) ||
        │       post.description.includes(query) ||
        │       post.tags.some(tag => tag.includes(query))
        │   )
        │
        └─→ return filtered posts
```

### 3. Подписка на email

```
User: вводит email и кликает "Подписаться"
        │
        ▼
src/components/email-subscription.tsx
        │
        ├─→ fetch('/api/subscribe', {
        │       method: 'POST',
        │       body: JSON.stringify({ email, segments })
        │   })
        │
        ▼
src/app/api/subscribe/route.ts
        │
        ├─→ Rate limiting (10 запросов/час)
        │
        ├─→ Supabase: INSERT INTO subscriptions
        │
        ├─→ Resend: отправка confirmation email
        │
        └─→ return success/error
```

### 4. Работа калькулятора

```
User: вводит параметры (размеры комнаты, тип материала)
        │
        ▼
src/components/widgets/paint-calculator.tsx
        │
        ├─→ calculations.ts: calculatePaint(params)
        │   │   - площадь стен
        │   │   - количество литров краски
        │   │   - количество банок
        │   │   - примерная стоимость
        │   │
        ├─→ Отображение результатов
        │
        └─→ CalculationResultNotes (пояснения)
```

---

## 🌍 Мультиязычность

### Стратегия локализации

```
Английский (основной язык):
  /                      → главная EN
  /posts/slug            → статья EN
  /calculators/paint     → калькулятор EN

Русский:
  /ru                    → главная RU
  /ru/posts/slug         → статья RU
  /ru/calculators/paint → калькулятор RU
  /ru/smety/slug         → сметы (только RU)
```

### Middleware логика

```typescript
// middleware.ts
if (pathname.startsWith("/ru/")) {
  // Русские страницы — пропускаем как есть
  return NextResponse.next()
}

if (pathname.startsWith("/en/")) {
  // /en/* → 301 редирект на /* (канонические EN URL)
  // handled by next.config.ts redirects
  return NextResponse.next()
}

if (pathname.startsWith("/tags/") && hasCyrillic(pathname)) {
  // /tags/кухня → /ru/tags/кухня (фикс 404 для кириллических тегов)
  return NextResponse.redirect(`/ru/tags/${slug}`, 301)
}

// Без префикса = канонический EN URL
return NextResponse.next()
```

### Contentlayer локализация

```typescript
// contentlayer.config.ts
locale: {
  type: "string",
  resolve: (post) =>
    /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath) ? "en" : "ru"
}

url: {
  type: "string",
  resolve: (post) =>
    /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath)
      ? `/posts/${slug}`
      : `/ru/posts/${slug}`
}
```

---

## 🔧 Интеграции

### 1. Аналитика

- **Vercel Analytics** — базовая аналитика
- **Vercel Speed Insights** — Core Web Vitals
- **Google Tag Manager** — GA4, другие теги
- **Yandex Metrika** — русскоязычная аудитория
- **Microsoft Clarity** — тепловые карты

*Загружаются только после согласия на cookies*

### 2. Email

- **Resend** — отправка транзакционных email
  - Подтверждение подписки
  - Уведомления о новых статьях
  - Отписка

### 3. SEO

- **IndexNow** — мгновенная индексация новых статей
  - Bing, Yandex, Seznam.cz
- **Sitemap** — автоматическая генерация (sitemap.ts)
- **RSS фиды** — `/rss.xml` (RU), `/feed-en.xml` (EN)
- **Schema.org** — WebSite, Organization, Article schemas

### 4. Деплой

- **Vercel** — хостинг
- **Automated builds** — Git push → deploy
- **Environment variables** — `.env.local`

---

## 🚀 Сборка и разработка

### Скрипты package.json

```json
{
  "dev": "concurrently \"next dev\" \"contentlayer2 dev\"",
  "build": "contentlayer2 build && node scripts/validate-content.mjs && next build",
  "start": "next start",
  "lint": "eslint . --ext ts,tsx,js,jsx",
  "type-check": "tsc --noEmit",
  "test:unit": "vitest run",
  "validate-content": "node scripts/validate-content.mjs"
}
```

### Процесс сборки

```
1. contentlayer2 build
   ├─→ Читает MDX файлы из content/posts/
   ├─→ Парсит frontmatter
   ├─→ Вычисляет поля (slug, url, readingTime, headings)
   └─→ Генерирует .contentlayer/generated/allPosts.mjs

2. validate-content.mjs
   ├─→ Проверяет наличие обязательных полей
   ├─→ Валидирует cover images
   └─→ Проверяет уникальность slugs

3. next build
   ├─→ Компилирует React компоненты
   ├─→ Генерирует статические страницы
   ├─→ Оптимизирует изображения
   └─→ Создает .next/ директорию
```

---

## 📊 Ключевые особенности

### 1. Статическая генерация (SSG)

- Все страницы статически генерируются при сборке
- `revalidate = 86400` — ISR кэширование (24 часа)
- Быстрая загрузка, SEO-оптимизация

### 2. MDX + React

- Вставка React компонентов в статьи:
  ```mdx
  ## Расчёт краски
  <PaintCalculator />
  ```

### 3. Динамические компоненты

- SearchBar — клиентский поиск по allPosts
- BookmarkButton — localStorage + синхронизация
- ViewHistory — история просмотров
- EmailSubscription — форма с rate limiting

### 4. Калькуляторы

- 19 встроенных калькуляторов
- Расчёт материалов, стоимости, количества
- Интеграция в статьи через MDX

### 5. Серии статей

- Структурированный контент (этапы ремонта, типы комнат)
- Навигация по сериям
- Отдельные страницы для серий

---

## 🔒 Безопасность

### Security Headers (next.config.ts)

- CSP (Content Security Policy)
- Referrer-Policy: strict-origin-when-cross-origin
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Permissions-Policy: ограничение доступа к камере/микрофону

### Rate Limiting

- API маршруты защищены (10 запросов/час)
- Подписка на email — защита от спама

### Supabase RLS

- Row Level Security для таблиц
- Только авторизованные запросы

---

## 📈 Производительность

### Оптимизации

- **Image Optimization** — Next.js Image, WebP/AVIF
- **Font Optimization** — Geist Sans/Mono, self-hosting
- **Code Splitting** — автоматический Next.js
- **Static Generation** — все страницы статические
- **ISR** — incremental static regeneration
- **Cache Headers** — долгое кэширование статических assets

### Core Web Vitals

- LCP (Largest Contentful Paint) — быстрая загрузка изображений
- FID (First Input Delay) — минимальный JS
- CLS (Cumulative Layout Shift) — стабильный layout

---

## 🎨 Стек технологий

### Frontend
- **Next.js 15** — React framework
- **React 19** — UI библиотека
- **TypeScript** — типизация
- **Tailwind CSS 4** — стилизация
- **shadcn/ui** — UI компоненты
- **Framer Motion** — анимации
- **Lucide React** — иконки

### Content
- **Contentlayer2** — MDX обработка
- **MDX** — Markdown + JSX
- **remark-gfm** — GitHub Flavored Markdown
- **rehype-slug** — якоря для заголовков
- **rehype-autolink-headings** — автоссылки

### Backend
- **Next.js API Routes** — серверless функции
- **Supabase** — база данных
- **Resend** — email сервис

### Инструменты
- **ESLint** — линтинг
- **Vitest** — unit тесты
- **patch-package** — патчи зависимостей
- **lightningcss** — быстрый CSS

---

## 📝 Типичный рабочий процесс

### Добавление новой статьи

1. Создать файл `content/posts/new-article.mdx`
2. Добавить frontmatter
3. Написать контент в MDX
4. Добавить изображения в `public/images/new-article/`
5. `npm run dev` — проверить
6. Commit & push → автоматический деплой

### Добавление нового калькулятора

1. Создать компонент в `src/components/widgets/new-calculator.tsx`
2. Добавить логику в `src/lib/calculations.ts`
3. Создать страницу `src/app/(en)/calculators/new/page.tsx`
4. Создать страницу `src/app/(ru)/ru/calculators/new/page.tsx`
5. Добавить ссылку в `site-header.tsx`

### Добавление новой темы/фичи

1. Изменить `src/app/theme-provider.tsx`
2. Обновить `src/components/theme-switcher.tsx`
3. Проверить все компоненты на адаптивность

---

## 🎯 Основные директории

```
repair-blog/
├── content/posts/          # MDX статьи
├── public/                # Статические файлы (изображения)
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (en)/         # Английские страницы
│   │   └── (ru)/ru/      # Русские страницы
│   ├── components/       # React компоненты
│   │   ├── ui/          # shadcn/ui компоненты
│   │   ├── widgets/     # Калькуляторы
│   │   └── ...          # Другие компоненты
│   ├── lib/             # Утилиты и helper-функции
│   ├── types/           # TypeScript типы
│   └── dictionaries/    # Локализация
├── supabase/             # SQL схемы для Supabase
├── scripts/              # Build скрипты
└── .contentlayer/        # Сгенерированный контент
```

---

## 🔄 Поток запроса (полный)

```
Пользователь: https://renohacks.com/ru/posts/gipsokarton-bez-treshchin
        │
        ▼
1. DNS → Vercel CDN
        │
        ▼
2. Middleware (middleware.ts)
   - Проверка префикса /ru/
   - Пропуск (без редиректа)
        │
        ▼
3. Next.js Router
   - src/app/(ru)/ru/posts/[slug]/page.tsx
        │
        ▼
4. Серверный компонент (page.tsx)
   - allPosts.find(post.slug === 'gipsokarton-bez-treshchin')
   - Чтение из .contentlayer/generated
        │
        ▼
5. Рендер страницы
   - AppShell (layout.tsx)
     ├─→ ThemeProvider
     ├─→ SiteHeader
     ├─→ BackgroundAnimation
     └─→ ...
   - ArticleHero
   - MDXRenderer
   - TableOfContents
   - RelatedPosts
   - EmailSubscription
        │
        ▼
6. Клиентская гидратация
   - SearchBar (интерактивный поиск)
   - BookmarkButton (localStorage)
   - ReadingProgress (scroll tracking)
        │
        ▼
7. Аналитика (при согласии)
   - GTM → GA4
   - Yandex Metrika
   - Vercel Analytics
```

---

## 📊 Статистика проекта

- **50+ статей** (RU)
- **19 калькуляторов**
- **2 языка** (RU/EN)
- **6 topic hubs** (bathroom, kitchen, bedroom, etc.)
- **4 series** (этапы ремонта, типы комнат)
- **20+ тегов**
- **100+ React компонентов**

---

## 🎓 Ключевые паттерны

### 1. Server Components по умолчанию

Все страницы — серверные компоненты для SEO и производительности.

### 2. Client Components только при необходимости

- SearchBar (инактивность)
- BookmarkButton (localStorage)
- ThemeSwitcher (браузер API)

### 3. Contentlayer как единственный источник контента

Все статьи проходят через Contentlayer → типизация → валидация.

### 4. shadcn/ui как UI-фундамент

Переиспользуемые компоненты (Button, Dialog, Dropdown, etc.).

### 5. Supabase как бэкенд

Подписки, уведомления, хранение данных.

---

*Сгенерировано автоматически на основе анализа кодовой базы*
