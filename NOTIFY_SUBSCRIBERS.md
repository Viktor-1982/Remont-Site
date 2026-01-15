# Уведомления подписчиков о новых статьях

## Описание

Автоматическая система отправки email-уведомлений всем подписчикам о публикации новых статей.

## Endpoints

- `GET /api/notify-subscribers?secret=YOUR_SECRET` - автоматический поиск и отправка уведомлений для новых статей (для cron)
- `POST /api/notify-subscribers` - ручная отправка уведомлений для конкретной статьи или автоматический режим

## Авторизация

Endpoint защищен секретным ключом. Добавьте в `.env.local` и Vercel Environment Variables:

```env
NOTIFY_SECRET=your-secret-key-here
```

## Автоматизация

Система автоматически находит статьи, опубликованные за последние 24 часа, и отправляет уведомления подписчикам. Повторная отправка для одной и той же статьи исключена благодаря отслеживанию в базе данных.

## Запрос

```json
{
  "slug": "remont-staroy-kvartiry",
  "locale": "ru"  // опционально, если не указан - будет найдена статья по slug
}
```

### Параметры

- `slug` (обязательный) - slug статьи (без расширения .mdx)
- `locale` (опциональный) - язык статьи ("ru" или "en"). Если не указан, будет найдена первая статья с таким slug

## Пример использования

### cURL

```bash
curl -X POST https://renohacks.com/api/notify-subscribers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-key-here" \
  -d '{
    "slug": "remont-staroy-kvartiry",
    "locale": "ru"
  }'
```

### JavaScript/TypeScript

```typescript
const response = await fetch('https://renohacks.com/api/notify-subscribers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NOTIFY_SECRET}`
  },
  body: JSON.stringify({
    slug: 'remont-staroy-kvartiry',
    locale: 'ru'
  })
})

const result = await response.json()
console.log(result)
```

## Ответ

### Успешный ответ

```json
{
  "message": "Notifications sent: 150 successful, 0 failed",
  "sent": 150,
  "failed": 0,
  "total": 150
}
```

### Ошибки

```json
{
  "error": "Post with slug \"invalid-slug\" not found"
}
```

## Настройка автоматизации

### Шаг 1: Создайте таблицу в Supabase

Выполните SQL скрипт `supabase/sent-notifications.sql` в Supabase SQL Editor для создания таблицы отслеживания отправленных уведомлений.

### Шаг 2: Настройте Vercel Cron Jobs

1. Добавьте `vercel.json` в корень проекта (уже создан)
2. Замените `YOUR_SECRET_KEY` в `vercel.json` на ваш реальный секретный ключ
3. Или используйте переменную окружения: `?secret=${process.env.NOTIFY_SECRET}`

**Важно:** В Vercel Cron Jobs нельзя использовать переменные окружения напрямую в URL. Используйте один из вариантов:
- Хардкод секретного ключа в `vercel.json` (менее безопасно, но работает)
- Используйте Vercel Environment Variables и настройте cron через Vercel Dashboard

### Шаг 3: Настройте Cron через Vercel Dashboard (рекомендуется)

1. Перейдите в Vercel Dashboard → ваш проект → Settings → Cron Jobs
2. Добавьте новый cron job:
   - **Path:** `/api/notify-subscribers`
   - **Schedule:** `0 */6 * * *` (каждые 6 часов) или `0 9 * * *` (каждый день в 9:00)
   - **Headers:** Добавьте заголовок `Authorization: Bearer YOUR_SECRET_KEY`

### Альтернативные варианты автоматизации

### Вариант 1: Webhook Vercel (рекомендуется)

Настройте webhook в Vercel, который будет вызываться после каждого деплоя:

1. Перейдите в настройки проекта Vercel
2. Добавьте Webhook: `https://renohacks.com/api/notify-subscribers`
3. Установите метод: POST
4. Добавьте заголовок: `Authorization: Bearer your-secret-key-here`
5. В теле запроса укажите slug новой статьи

### Вариант 2: Ручной вызов после публикации

После публикации новой статьи вызовите endpoint вручную через cURL или другой инструмент.

### Вариант 3: GitHub Actions

Создайте GitHub Action, который будет автоматически вызывать endpoint при пуше новой статьи:

```yaml
name: Notify Subscribers

on:
  push:
    paths:
      - 'content/posts/**/*.mdx'

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Notify subscribers
        run: |
          curl -X POST https://renohacks.com/api/notify-subscribers \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer ${{ secrets.NOTIFY_SECRET }}" \
            -d '{"slug": "your-article-slug", "locale": "ru"}'
```

## Ограничения

- Resend API имеет лимиты на количество писем в день
- Письма отправляются батчами по 50 штук с задержкой 1 секунда между батчами
- Уведомления отправляются только подписчикам, выбравшим язык статьи

## Безопасность

- Endpoint защищен секретным ключом
- Убедитесь, что `NOTIFY_SECRET` установлен в переменных окружения Vercel
- Не коммитьте секретный ключ в репозиторий

