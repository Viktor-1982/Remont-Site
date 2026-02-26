# Copilot instructions for repair-blog

## Big picture
- Next.js 15 App Router site with MDX content via Contentlayer2; posts live in content/posts and content/posts/en with computed fields (locale, slug, url, headings, readingTime). See config in [contentlayer.config.ts](contentlayer.config.ts).
- Page rendering is mostly static with ISR: many pages set `revalidate = 86400` and `dynamic = "force-static"` (example in [src/app/page.tsx](src/app/page.tsx)).
- MDX rendering flows through `MdxContent` -> `createMdxComponents()` which wires custom widgets and heading IDs (see [src/components/mdx-content.tsx](src/components/mdx-content.tsx) and [src/components/mdx-components.server.tsx](src/components/mdx-components.server.tsx)).
- Blog post page composes SEO, JSON-LD, TOC, related posts, and view tracking. Use [src/app/posts/[slug]/page.tsx](src/app/posts/[slug]/page.tsx) as the reference layout.

## Content and localization conventions
- `content/posts/**` is Russian by default; English lives under `content/posts/en/**`. Locale is derived from path in Contentlayer (see [contentlayer.config.ts](contentlayer.config.ts)).
- Cross-language linking uses `translationOf` in frontmatter; SEO uses `getPostMetadata` to build hreflang (see [src/lib/seo-post.ts](src/lib/seo-post.ts)).
- When filtering posts, RU pages typically exclude drafts and `post.url` starting with `/en/` (example in [src/app/page.tsx](src/app/page.tsx)).

## MDX widgets and components
- Custom MDX components are defined in [src/components/mdx-components.server.tsx](src/components/mdx-components.server.tsx) and client-only enhancements (gallery, dynamic widgets) are in [src/components/mdx-components.tsx](src/components/mdx-components.tsx). Use these instead of ad-hoc MDX mapping.
- Widgets (calculators, comparison tables, galleries) live under `src/components/widgets` and are referenced by name in MDX (e.g., `PaintCalculator`, `TileCalculator`).

## API and data integrations
- Subscriptions + notifications use Supabase when configured, with in-memory fallback for dev. See repo helpers in [src/lib/subscriptions-repo.ts](src/lib/subscriptions-repo.ts) and [src/lib/notifications-repo.ts](src/lib/notifications-repo.ts).
- Email is sent via Resend (optional). API routes: subscribe/unsubscribe in [src/app/api/subscribe/route.ts](src/app/api/subscribe/route.ts) and [src/app/api/unsubscribe/route.ts](src/app/api/unsubscribe/route.ts), notify in [src/app/api/notify-subscribers/route.ts](src/app/api/notify-subscribers/route.ts).
- IndexNow submission is exposed at [src/app/api/indexnow/route.ts](src/app/api/indexnow/route.ts).
- View counters and history are client-only and stored in `localStorage` (see [src/lib/view-counter.ts](src/lib/view-counter.ts)).

## Dev workflows (scripts)
- `npm run dev` runs Next.js + Contentlayer together (uses `concurrently`).
- `npm run build` runs Contentlayer build + content validation + Next build.
- Tests: `npm run test:unit` (Vitest), `npm run test:e2e` (Playwright), `npm run test:lighthouse` (LHCI).

## Environment variables (when touching API/ops)
- Supabase: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (see [src/lib/supabase-admin.ts](src/lib/supabase-admin.ts)).
- Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (used in subscribe/notify routes).
- Site URL: `NEXT_PUBLIC_SITE_URL` (fallbacks to https://renohacks.com in routes).
- Cron/notify secrets: `CRON_SECRET` or `NOTIFY_SECRET` (used in notify-subscribers route).
