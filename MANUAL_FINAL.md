# 📖 Подробный мануал по сайту **repair-blog**

## 📑 Оглавление
1. Что это за проект?
2. Файлы в корне проекта
3. Папка `/src`
4. Папка `/content`
5. Папка `/public`
6. Как работает сайт
7. Как добавить новую статью
8. Как добавить новый калькулятор
9. Основные команды
10. Чек-лист готового
11. Деплой

---

## 🔹 1. Что это за проект?
**repair-blog** — это современный блог о ремонте.  
Он написан на:
- **Next.js 15.5.2** — фреймворк для React.
- **TypeScript** — строгая типизация для кода.
- **TailwindCSS 4** — система утилитарных классов для стилей.
- **Contentlayer 2** — автоматически подгружает `.mdx` статьи в проект.
- **shadcn/ui** — библиотека готовых UI-компонентов.

📌 Особенности:
- Посты хранятся в `/content` в формате `.mdx`.
- Есть калькуляторы (краска, плитка, обои).
- Тёмная/светлая тема.
- SEO-метаданные для каждой статьи.
- Статическая генерация страниц.

---

## 🔹 2. Файлы в корне проекта

### `package.json`
- Описывает проект и его зависимости.
- Основные команды:
  - `npm run dev` — запуск локального сервера.
  - `npm run build` — сборка сайта.
  - `npm run start` — запуск готовой версии.
  - `npm run lint` — проверка кода.

### `tsconfig.json`
- Настройки TypeScript.
- Можно писать короткие пути `@/components/...` вместо длинных `../../components/...`.

### `.gitignore`
- Файлы, которые не должны попадать в git (`node_modules`, `.env`, `.next`).

### `README.md`
- Краткая инструкция по запуску проекта.

### `components.json`
- Конфиг для **shadcn/ui**.
- Указаны стили, алиасы (`@/components`, `@/lib`, `@/hooks`) и иконки (lucide).

### `postcss.config.mjs`
- Настройка PostCSS (нужна для Tailwind).

### `eslint.config.mjs`
- Проверяет код (Next.js + TypeScript).

### `next.config.mjs`
- Подключает **Contentlayer**.
- Разрешает загрузку картинок с Unsplash.

### `contentlayer.config.ts`
- Схема постов: `title`, `description`, `date`, `tags`, `cover`.
- Все `.mdx` становятся доступны как `allPosts`.

---

## 🔹 3. Папка `/src`

### `/src/app`
- `layout.tsx` — общий каркас (хедер, футер, `<ThemeProvider>`).
- `globals.css` — глобальные стили.
- `page.tsx` — главная страница.
- `/calculators/paint/page.tsx` — калькулятор краски.
- `/calculators/tile/page.tsx` — калькулятор плитки.
- `/calculators/wallpaper/page.tsx` — калькулятор обоев.
- `[slug]/page.tsx` — страница для каждого поста.

### `/src/components`
- `site-header.tsx` — хедер (логотип, меню, переключение темы).
- `site-footer.tsx` — футер.
- `article-hero.tsx` — обложка статьи.
- `article-card.tsx` — карточка статьи.
- `table-of-contents.tsx` — оглавление.
- `mdx-renderer.tsx` — вывод `.mdx`.
- `/widgets/paint-calculator.tsx` — калькулятор краски.
- `/widgets/tile-calculator.tsx` — калькулятор плитки.
- `/widgets/wallpaper-calculator.tsx` — калькулятор обоев.
- `/ui/` — кнопки, карточки и элементы **shadcn/ui**.

### `/src/lib`
- `utils.ts` — утилиты (например, функция `cn`).

---

## 🔹 4. Папка `/content`
- Хранятся все `.mdx` статьи.
- В начале каждой статьи есть frontmatter:

```md
---
title: "5 советов для ремонта, чтобы не сойти с ума"
description: "Опыт и полезные лайфхаки."
date: 2025-09-12
tags: ["ремонт", "лайфхаки", "интерьер"]
cover: "/images/remont-sovety-5/remont-lifehacks.png"
---
```

- Далее идёт Markdown + JSX-компоненты:

```mdx
## Шаг 1. Определите бюджет
<PaintCalculator />
```

---

## 🔹 5. Папка `/public`
- Файлы, доступные напрямую:
  - `favicon.ico`
  - `robots.txt`
  - `sitemap.xml`
  - `/images/...` — картинки для постов.

---

## 🔹 6. Как работает сайт
1. Next.js рендерит страницы из `/src/app`.
2. Contentlayer превращает `.mdx` → `allPosts`.
3. TailwindCSS отвечает за стили.
4. shadcn/ui даёт UI-компоненты.
5. Хедер/футер общие для всех страниц.
6. Калькуляторы встроены как React-компоненты.
7. SEO через `generateMetadata`.

---

## 🔹 7. Как добавить новую статью
1. Перейти в `/content`.
2. Создать файл `new-post.mdx`.
3. Добавить frontmatter (см. пример выше).
4. Написать статью в Markdown.
5. Сохранять картинки в `/public/images/new-post/`.
6. Проверить через `npm run dev`.

---

## 🔹 8. Как добавить новый калькулятор
1. Создать компонент в `/src/components/widgets/`.
2. Сделать страницу в `/src/app/calculators/.../page.tsx`.
3. Подключить компонент.
4. Добавить ссылку в `site-header.tsx`.

---

## 🔹 9. Основные команды

```bash
npm run dev     # запуск локального сервера (http://localhost:3000)
npm run build   # сборка проекта
npm run start   # запуск собранного сайта
npm run lint    # проверка кода линтером
```

---

## 🔹 10. Чек-лист готового
- [x] Next.js 15 + TypeScript.
- [x] Tailwind 4 + shadcn/ui.
- [x] Contentlayer для MDX.
- [x] Хедер + футер.
- [x] Калькулятор краски.
- [x] Калькулятор плитки.
- [x] Калькулятор обоев.
- [x] SEO-метаданные.
- [x] Картинки и sitemap.

---

## 🔹 11. Деплой

### Netlify
1. Зарегистрироваться на [netlify.com](https://netlify.com).
2. Подключить GitHub-репозиторий.
3. В настройках указать:
  - **Build command:** `npm run build`
  - **Publish directory:** `.next`
4. Netlify автоматически пересобирает сайт при каждом пуше.

### Vercel
1. Зарегистрироваться на [vercel.com](https://vercel.com).
2. Подключить репозиторий.
3. Vercel сам определяет Next.js и собирает проект.

---
