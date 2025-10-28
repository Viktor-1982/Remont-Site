# 🧪 Справочник команд автотестирования Renohacks.com

## 📋 Содержание
- [Быстрые команды](#быстрые-команды)
- [Полные команды](#полные-команды)
- [E2E тестирование](#e2e-тестирование)
- [Performance тестирование](#performance-тестирование)
- [Отладочные команды](#отладочные-команды)
- [Git команды](#git-команды)
- [Workflow примеры](#workflow-примеры)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Быстрые команды

### `npm run test:unit`
**Что делает:** Запускает unit тесты (Vitest)
**Время:** ~30 секунд
**Когда использовать:** Перед каждым коммитом
**Что проверяет:**
- ✅ Структура постов Contentlayer
- ✅ Метаданные статей (title, description, date, tags)
- ✅ Уникальность slug и валидность URL
- ✅ Качество контента (длина описаний, заголовков)
- ✅ Отсутствие draft постов в продакшене

```bash
npm run test:unit
```

### `npm run lint`
**Что делает:** Проверяет качество кода (ESLint)
**Время:** ~10 секунд
**Когда использовать:** Перед коммитом
**Что проверяет:**
- ✅ Стиль кода
- ✅ Потенциальные ошибки
- ✅ Соответствие стандартам

```bash
npm run lint
```

### `npm run type-check`
**Что делает:** Проверяет TypeScript типы
**Время:** ~15 секунд
**Когда использовать:** Перед коммитом
**Что проверяет:**
- ✅ Корректность типов
- ✅ Отсутствие ошибок компиляции
- ✅ Совместимость интерфейсов

```bash
npm run type-check
```

---

## 🔍 Полные команды

### `npm run test:all`
**Что делает:** Запускает все тесты (ESLint + TypeScript + Unit + E2E)
**Время:** 2-5 минут
**Когда использовать:** Перед push в main
**Что проверяет:**
- ✅ ESLint проверки
- ✅ TypeScript проверки
- ✅ Unit тесты
- ✅ E2E тесты (если сервер запущен)

```bash
npm run test:all
```

### `npm run build`
**Что делает:** Собирает проект для продакшена
**Время:** 1-3 минуты
**Когда использовать:** Перед деплоем
**Что делает:**
- ✅ Генерирует контент (Contentlayer)
- ✅ Собирает Next.js приложение
- ✅ Оптимизирует изображения
- ✅ Создает статические файлы

```bash
npm run build
```

---

## 🌐 E2E тестирование

### `npm run test:e2e`
**Что делает:** Запускает все E2E тесты (Playwright)
**Время:** 5-15 минут
**Требования:** Запущенный сервер (`npm run dev`)
**Что проверяет:**
- ✅ Загрузка всех страниц
- ✅ Навигация и ссылки
- ✅ Функциональность калькуляторов
- ✅ Переключение языков
- ✅ SEO мета-теги
- ✅ Адаптивность

```bash
# Терминал 1: Запустить сервер
npm run dev

# Терминал 2: Запустить E2E тесты
npm run test:e2e
```

### `npm run test:e2e -- --project=smoke`
**Что делает:** Запускает только smoke тесты (критический путь)
**Время:** 2-5 минут
**Требования:** Запущенный сервер
**Что проверяет:**
- ✅ Загрузка главной страницы
- ✅ Основные навигационные ссылки
- ✅ Footer ссылки
- ✅ Обработка 404 страниц

```bash
npm run test:e2e -- --project=smoke
```

### `npm run test:e2e -- --project=functional`
**Что делает:** Запускает функциональные тесты
**Время:** 3-8 минут
**Требования:** Запущенный сервер
**Что проверяет:**
- ✅ Калькулятор бюджета ремонта
- ✅ Добавление/удаление категорий
- ✅ Расчеты и валидация
- ✅ Резервный процент
- ✅ Очистка формы

```bash
npm run test:e2e -- --project=functional
```

### `npm run test:e2e -- --project=ui`
**Что делает:** Запускает UI тесты
**Время:** 3-8 минут
**Требования:** Запущенный сервер
**Что проверяет:**
- ✅ Адаптивность на разных экранах
- ✅ Переключатель тем
- ✅ Мобильную навигацию
- ✅ Hover эффекты и фокус
- ✅ Видимость SVG иконок

```bash
npm run test:e2e -- --project=ui
```

### `npm run test:e2e:ui`
**Что делает:** Запускает E2E тесты с UI интерфейсом
**Время:** 5-15 минут
**Требования:** Запущенный сервер
**Преимущества:**
- ✅ Визуальный интерфейс
- ✅ Возможность отладки
- ✅ Просмотр результатов в реальном времени
- ✅ Возможность перезапуска отдельных тестов

```bash
npm run test:e2e:ui
```

### `npm run test:e2e:headed`
**Что делает:** Запускает E2E тесты с видимым браузером
**Время:** 5-15 минут
**Требования:** Запущенный сервер
**Преимущества:**
- ✅ Видно, что происходит в браузере
- ✅ Удобно для отладки
- ✅ Можно следить за выполнением тестов

```bash
npm run test:e2e:headed
```

---

## ⚡ Performance тестирование

### `npm run test:lighthouse`
**Что делает:** Запускает полный Lighthouse CI тест
**Время:** 3-8 минут
**Требования:** Запущенный сервер
**Что проверяет:**
- ✅ Performance (производительность) ≥70%
- ✅ Accessibility (доступность) ≥80%
- ✅ Best Practices (лучшие практики) ≥80%
- ✅ SEO (поисковая оптимизация) ≥80%

```bash
# Терминал 1: Запустить сервер
npm run dev

# Терминал 2: Запустить Lighthouse
npm run test:lighthouse
```

### `npm run test:lighthouse:simple`
**Что делает:** Запускает простой Lighthouse тест
**Время:** 1-3 минуты
**Требования:** Запущенный сервер
**Что делает:**
- ✅ Создает HTML отчет
- ✅ Сохраняет в `lighthouse-report.html`
- ✅ Показывает детальные метрики
- ✅ Не блокирует CI/CD

```bash
# Терминал 1: Запустить сервер
npm run dev

# Терминал 2: Запустить простой Lighthouse
npm run test:lighthouse:simple
```

---

## 🔧 Отладочные команды

### `npm run test:unit:watch`
**Что делает:** Запускает unit тесты в режиме наблюдения
**Время:** Постоянно
**Когда использовать:** При активной разработке
**Преимущества:**
- ✅ Автоматический перезапуск при изменениях
- ✅ Быстрая обратная связь
- ✅ Удобно для TDD (Test-Driven Development)

```bash
npm run test:unit:watch
```

### `npm run dev`
**Что делает:** Запускает сервер разработки
**Время:** Постоянно
**Когда использовать:** Для разработки и E2E тестов
**Что делает:**
- ✅ Запускает Next.js сервер на порту 3000
- ✅ Генерирует контент в реальном времени
- ✅ Hot reload при изменениях
- ✅ Поддерживает TypeScript

```bash
npm run dev
```

### `npm start`
**Что делает:** Запускает продакшен сервер
**Время:** Постоянно
**Когда использовать:** Для тестирования продакшен сборки
**Требования:** Предварительно выполнить `npm run build`

```bash
npm run build
npm start
```

---

## 📝 Git команды

### `git add .`
**Что делает:** Добавляет все изменения в staging area
**Когда использовать:** Перед коммитом

```bash
git add .
```

### `git commit -m "сообщение"`
**Что делает:** Создает коммит с изменениями
**Когда использовать:** После добавления файлов

```bash
git commit -m "feat: Add new calculator feature"
```

### `git push origin main`
**Что делает:** Отправляет коммиты в GitHub
**Когда использовать:** После коммита
**Что запускает:** GitHub Actions CI/CD pipeline

```bash
git push origin main
```

### `git status`
**Что делает:** Показывает статус репозитория
**Когда использовать:** Для проверки изменений

```bash
git status
```

---

## 🔄 Workflow примеры

### 📋 Ежедневный workflow

```bash
# 1. Разработка
# ... делаете изменения ...

# 2. Быстрая проверка
npm run test:unit

# 3. Если все ОК - коммит
git add .
git commit -m "feat: Add new feature"

# 4. Push (автоматически запустятся все тесты в GitHub)
git push origin main
```

### 🔍 Полный workflow перед релизом

```bash
# 1. Разработка
# ... делаете изменения ...

# 2. Полная проверка
npm run test:all

# 3. Если E2E падают - запустить сервер
npm run dev  # В другом терминале

# 4. Повторный запуск E2E
npm run test:e2e -- --project=smoke

# 5. Performance тест
npm run test:lighthouse:simple

# 6. Коммит и push
git add .
git commit -m "feat: Add new feature with tests"
git push origin main
```

### 🧮 Workflow для изменения калькулятора

```bash
# 1. Изменили калькулятор
# ... редактируете код ...

# 2. Unit тесты
npm run test:unit

# 3. Запустить сервер для E2E
npm run dev  # В другом терминале

# 4. Функциональные тесты
npm run test:e2e -- --project=functional

# 5. UI тесты
npm run test:e2e -- --project=ui

# 6. Коммит
git add .
git commit -m "fix: Update calculator logic"
git push origin main
```

### 🎨 Workflow для изменения стилей

```bash
# 1. Изменили стили
# ... редактируете CSS ...

# 2. Линтинг
npm run lint

# 3. Запустить сервер
npm run dev  # В другом терминале

# 4. UI тесты
npm run test:e2e -- --project=ui

# 5. Performance тест
npm run test:lighthouse:simple

# 6. Коммит
git add .
git commit -m "style: Update mobile layout"
git push origin main
```

---

## 🚨 Troubleshooting

### ❌ Unit тесты падают

```bash
# Смотрим детали ошибки
npm run test:unit

# Исправляем проблему в коде
# Повторный запуск
npm run test:unit
```

### ❌ E2E тесты падают с timeout

```bash
# Проверяем, запущен ли сервер
npm run dev

# Запускаем тесты снова
npm run test:e2e -- --project=smoke

# Если все еще падают - смотрим отчет
# Открываем playwright-report/index.html
```

### ❌ Performance тесты падают

```bash
# Проверяем, запущен ли сервер
npm run dev

# Запускаем простой Lighthouse
npm run test:lighthouse:simple

# Смотрим отчет в lighthouse-report.html
```

### ❌ Build падает

```bash
# Проверяем TypeScript ошибки
npm run type-check

# Проверяем ESLint ошибки
npm run lint

# Исправляем ошибки
# Повторный build
npm run build
```

### ❌ GitHub Actions падают

1. **Заходим в GitHub → Actions**
2. **Смотрим детали ошибки**
3. **Исправляем проблему локально**
4. **Делаем новый коммит**

```bash
# Исправляем проблему
# Коммит
git add .
git commit -m "fix: Resolve CI/CD issue"
git push origin main
```

---

## 📊 Результаты тестирования

### ✅ Успешные результаты

```bash
# Unit тесты
✓ tests/unit/contentlayer/posts.test.ts (10 tests) 23ms
Test Files  1 passed (1)
Tests  10 passed (10)

# E2E тесты
✓ 11 tests using 8 workers
✓ [smoke] › basic-structure.spec.ts:16:9 › should load / with correct title
✓ [smoke] › basic-structure.spec.ts:16:9 › should load /about with correct title
...

# Performance тесты
✓ Performance: 85/100
✓ Accessibility: 92/100
✓ Best Practices: 88/100
✓ SEO: 95/100
```

### ❌ Неуспешные результаты

```bash
# Unit тесты
✗ tests/unit/contentlayer/posts.test.ts (10 tests) 23ms
✗ Test Files  1 failed (1)
✗ Tests  9 passed (9), 1 failed (1)

# E2E тесты
✗ 8 failed
[smoke] › basic-structure.spec.ts:16:9 › should load / with correct title
Error: page.goto: Test timeout of 30000ms exceeded

# Performance тесты
✗ Performance: 45/100 (FAILED)
✗ Accessibility: 75/100 (WARNING)
```

---

## 🎯 Рекомендации

### 🚀 Ежедневно
- `npm run test:unit` - перед каждым коммитом
- `npm run test:all` - перед push в main

### 🔄 Еженедельно
- `npm run test:e2e` - полная проверка E2E
- `npm run test:lighthouse:simple` - проверка производительности

### 🚀 Перед релизом
- `npm run test:all` - все тесты
- Проверка в GitHub Actions
- Мониторинг деплоя

---

## 📞 Поддержка

Если у вас возникли проблемы:

1. **Проверьте этот справочник**
2. **Посмотрите логи ошибок**
3. **Проверьте GitHub Actions**
4. **Обратитесь к документации:**
   - [Vitest](https://vitest.dev/)
   - [Playwright](https://playwright.dev/)
   - [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

**🎉 Удачного тестирования!**
