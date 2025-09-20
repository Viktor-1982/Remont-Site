# 🛠️ repair-blog

Современный блог о ремонте: статьи, гайды, лайфхаки, калькуляторы.  
Стек: **Next.js 15 + TypeScript + Tailwind + Contentlayer + shadcn/ui**.

---

## 🚀 Запуск проекта

```bash
# установка зависимостей
npm install

# запуск локального сервера
npm run dev

# сборка
npm run build

# запуск продакшн-версии
npm run start

# проверка кода
npm run lint
```

Сайт будет доступен по адресу:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 📂 Структура проекта

- `/src/app` — страницы и layout
    - `layout.tsx` — общий каркас (хедер, футер, тема)
    - `page.tsx` — главная страница
    - `/calculators/...` — страницы калькуляторов

- `/src/components` — UI, хедер, футер, карточки статей, калькуляторы
- `/src/lib` — утилиты (`utils.ts`)
- `/content` — статьи в формате `.mdx`
- `/public` — картинки, favicon, sitemap

---

## 🔧 Особенности

- Поддержка **MDX** — можно вставлять React-компоненты прямо в статью.
- **Contentlayer** автоматически подгружает статьи.
- Тёмная/светлая тема через `next-themes`.
- SEO-метаданные генерируются автоматически.
- Встроенные калькуляторы:
    - 🎨 Краска (`PaintCalculator`)
    - 🧱 Плитка (`TileCalculator`)
    - 🪟 Обои (`WallpaperCalculator`)

---

## 📝 Как добавить новую статью

1. Перейти в папку `/content`.
2. Создать новый файл, например:

   ```
   /content/remont-plan.mdx
   ```

3. В начале файла написать frontmatter:

   ```md
   ---
   title: "Как составить план ремонта"
   description: "Пошаговое руководство, чтобы ремонт не превратился в хаос."
   date: 2025-09-20
   tags: ["ремонт", "планирование"]
   cover: "/images/remont-plan/cover.png"
   ---
   ```

4. Написать текст статьи в Markdown + можно вставлять компоненты:

   ```mdx
   ## Шаг 1. Определите бюджет
   <PaintCalculator />
   ```

5. Картинки сохранить в `/public/images/remont-plan/`.
6. После сохранения — запустить `npm run dev` и проверить.

---

## 🔌 Как добавить новый калькулятор

1. Создать компонент в `/src/components/widgets/`, например:

   ```
   wallpaper-calculator.tsx
   ```

2. Сделать страницу в `/src/app/calculators/wallpaper/page.tsx`:

   ```tsx
   import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

   export default function WallpaperPage() {
     return (
       <div className="max-w-2xl mx-auto py-10 px-4">
         <h1 className="text-2xl font-bold mb-6">Калькулятор обоев</h1>
         <WallpaperCalculator />
       </div>
     )
   }
   ```

3. Добавить ссылку на калькулятор в меню (`site-header.tsx`).

---

## 📖 Дополнительная документация

Подробный мануал проекта:  
👉 [MANUAL.md](./MANUAL.md)

---

## 🌍 Деплой

Сайт развёрнут на **Netlify**  
Можно использовать и **Vercel**.

### Как задеплоить на Netlify:
1. Зарегистрироваться на [netlify.com](https://netlify.com).
2. Подключить репозиторий GitHub.
3. В настройках указать:
    - **Build command:** `npm run build`
    - **Publish directory:** `.next`
4. Netlify автоматически пересоберёт сайт при каждом пуше.

---

## 🧑‍💻 Автор

**Viktor Mezhakov**  
Проект создан для блога **PRO ремонт**.
