# Руководство по Rate Limiting

## ✅ Что было сделано

Добавлена система rate limiting для защиты API endpoints от злоупотреблений, brute-force атак и DDoS.

### Защищенные endpoints:

1. **`/api/admin/auth/login`** - 5 попыток входа в 15 минут (защита от brute-force)
2. **`/api/admin/articles`** - 100 GET запросов в минуту
3. **`/api/admin/articles` POST** - 10 созданий статей в минуту
4. **`/api/admin/articles` PUT** - 20 обновлений статей в минуту
5. **`/api/admin/articles/[slug]`** - 100 GET запросов в минуту
6. **`/api/admin/upload-image`** - 30 загрузок в минуту
7. **`/api/admin/upload-image-auto`** - 10 Git коммитов в минуту
8. **`/api/chat`** - 20 запросов в минуту

## 📁 Структура

```
src/
└── lib/
    └── rate-limit.ts    # Утилита для rate limiting
```

## 🔧 Как это работает

### 1. Идентификация клиентов

Rate limiting работает на основе:
- **IP адреса** (из заголовков `x-forwarded-for` или `x-real-ip`)
- **User-Agent** (fallback для разработки)

### 2. Алгоритм

Используется **sliding window** подход:
- Каждый запрос увеличивает счетчик
- Счетчик сбрасывается после истечения временного окна
- При превышении лимита возвращается HTTP 429 Too Many Requests

### 3. HTTP Headers

При каждом запросе добавляются заголовки:

```
X-RateLimit-Limit: 20          # Максимальное количество запросов
X-RateLimit-Remaining: 15      # Оставшееся количество запросов
X-RateLimit-Reset: 2025-01-... # Время сброса лимита (ISO string)
Retry-After: 45                # Секунд до следующей попытки (при 429)
```

## 📊 Лимиты по endpoints

| Endpoint | Лимит | Окно | Причина |
|----------|-------|------|---------|
| `/api/admin/auth/login` | 5 | 15 мин | Защита от brute-force |
| `/api/admin/articles` GET | 100 | 1 мин | Нормальное использование |
| `/api/admin/articles` POST | 10 | 1 мин | Создание статей |
| `/api/admin/articles` PUT | 20 | 1 мин | Обновление статей |
| `/api/admin/articles/[slug]` GET | 100 | 1 мин | Чтение статей |
| `/api/admin/upload-image` | 30 | 1 мин | Загрузка файлов |
| `/api/admin/upload-image-auto` | 10 | 1 мин | GitHub API лимиты |
| `/api/chat` | 20 | 1 мин | Защита от злоупотребления |

## 💻 Использование

### В API Routes

```typescript
import { checkRateLimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
    // ✅ Проверка rate limit
    const rateLimit = checkRateLimit(req, {
        maxRequests: 20,
        windowMs: 60 * 1000, // 1 минута
        message: "Too many requests. Please slow down.",
    })

    if (!rateLimit.success) {
        return NextResponse.json(
            { error: rateLimit.message },
            {
                status: 429,
                headers: {
                    "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
                    "X-RateLimit-Limit": "20",
                    "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                    "X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
                },
            }
        )
    }

    // Ваш код...
}
```

### Настройка лимитов

```typescript
const rateLimit = checkRateLimit(req, {
    maxRequests: 100,              // Максимум запросов
    windowMs: 60 * 1000,           // Временное окно (мс)
    message: "Custom error message", // Сообщение об ошибке
    useIp: true,                   // Использовать IP (по умолчанию true)
    identifier: "optional-id",     // Дополнительный идентификатор
})
```

## ⚠️ Важные замечания

### 1. Хранение данных

**Текущая реализация**: In-memory (Map)

**Ограничения:**
- При перезапуске сервера все счетчики сбрасываются
- Не работает в multi-server окружении (каждый сервер имеет свой счетчик)

**Для продакшена рекомендуется:**
- Redis для хранения счетчиков
- Upstash Rate Limit (serverless-friendly)
- База данных (PostgreSQL, MongoDB)

### 2. IP Spoofing

При использовании прокси (Vercel, Cloudflare) IP берется из заголовков:
- `x-forwarded-for` (первый IP в списке)
- `x-real-ip` (fallback)

⚠️ Злоумышленник может подделать эти заголовки, но это не критично для большинства случаев.

### 3. Распределенная атака

Если атака идет с множества IP, каждый IP имеет свой лимит. Для защиты от этого рекомендуется:
- Использовать общий лимит на уровне приложения
- Использовать более сложные алгоритмы (например, token bucket)
- Использовать внешние сервисы (Cloudflare, AWS WAF)

## 🚀 Миграция на Redis (для продакшена)

### Пример с Upstash Redis

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// src/lib/rate-limit-redis.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 m"),
})

export async function checkRateLimitRedis(
    req: Request,
    identifier: string
) {
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier)
    
    return {
        success,
        remaining,
        resetTime: reset,
        limit,
    }
}
```

### Пример использования

```typescript
export async function POST(req: NextRequest) {
    const identifier = getClientIdentifier(req)
    const rateLimit = await checkRateLimitRedis(req, identifier)
    
    if (!rateLimit.success) {
        return NextResponse.json(
            { error: "Rate limit exceeded" },
            { status: 429 }
        )
    }
    
    // Ваш код...
}
```

## 📊 Мониторинг

### Статистика rate limit

```typescript
import { getRateLimitStats } from "@/lib/rate-limit"

// Получить статистику для мониторинга
const stats = getRateLimitStats()
console.log({
    activeEntries: stats.activeEntries,    // Количество активных записей
    totalRequests: stats.totalRequests,    // Общее количество запросов
})
```

### Логирование

Рекомендуется логировать:
- Запросы с HTTP 429
- IP адреса при превышении лимита
- Статистику использования rate limit

Пример:

```typescript
if (!rateLimit.success) {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
    console.warn(`⚠️ Rate limit exceeded for IP: ${clientIp}, endpoint: ${req.url}`)
    
    // Отправить в систему мониторинга (например, Sentry, DataDog)
    // logToMonitoring({ type: "rate_limit_exceeded", ip: clientIp, endpoint: req.url })
    
    return NextResponse.json({ error: rateLimit.message }, { status: 429 })
}
```

## 🔒 Безопасность

### Защита от обхода

1. **IP Rotation**: Клиент может использовать VPN/прокси для смены IP
   - Решение: Использовать более строгие лимиты на уровне приложения
   - Решение: Блокировать подозрительные паттерны

2. **Header Spoofing**: Клиент может подделать заголовки IP
   - Решение: Использовать надежные источники IP (trusted proxies)
   - Решение: Использовать другие идентификаторы (session tokens, API keys)

3. **Distributed Attacks**: Атака с множества IP
   - Решение: Использовать общий лимит на уровне приложения
   - Решение: Использовать внешние сервисы (Cloudflare, AWS WAF)

### Дополнительные меры

1. **Exponential Backoff**: Увеличивать время блокировки при повторных нарушениях
2. **Whitelist**: Разрешить определенные IP адреса (для админов)
3. **Blacklist**: Блокировать известные злоумышленники
4. **CAPTCHA**: Требовать CAPTCHA при превышении лимита

## 📚 Дополнительные ресурсы

- [OWASP Rate Limiting](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#rate-limiting)
- [Upstash Rate Limit](https://upstash.com/docs/redis/features/ratelimit)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## ❓ Частые вопросы

**Q: Что происходит при превышении лимита?**
A: Возвращается HTTP 429 с заголовками `Retry-After` и `X-RateLimit-Reset`.

**Q: Можно ли настроить разные лимиты для разных пользователей?**
A: Да, используйте параметр `identifier` в `checkRateLimit()`.

**Q: Работает ли это на Vercel?**
A: Да, но для продакшена рекомендуется использовать Redis (например, Upstash) для работы в serverless окружении.

**Q: Как сбросить лимит для конкретного IP?**
A: Используйте `resetRateLimit(identifier)` из `rate-limit.ts`.

**Q: Нужно ли настраивать rate limiting на уровне CDN?**
A: Рекомендуется использовать оба уровня: CDN для базовой защиты, application-level для гибкости.

