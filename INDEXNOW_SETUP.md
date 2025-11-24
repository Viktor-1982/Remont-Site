# IndexNow Setup Guide

IndexNow — это протокол для мгновенного уведомления поисковых систем (Bing, Yandex и др.) об изменениях на сайте.

## ✅ Что уже настроено

1. **API ключ сгенерирован**: `506b8013c6ddcce134765ffa1fc1b102`
2. **Файл ключа размещён**: `public/506b8013c6ddcce134765ffa1fc1b102.txt`
3. **API endpoint создан**: `/api/indexnow`
4. **Утилита для отправки**: `src/lib/indexnow.ts`
5. **CLI скрипт**: `scripts/submit-to-indexnow.js`

## 📋 Использование

### 1. Через API endpoint

**POST запрос (для множества URL, до 10,000):**
```bash
curl -X POST https://renohacks.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://renohacks.com/posts/new-article",
      "https://renohacks.com/posts/updated-article"
    ]
  }'
```

**GET запрос (для одного URL):**
```bash
# URL должен быть URL-encoded
curl "https://renohacks.com/api/indexnow?url=https%3A%2F%2Frenohacks.com%2Fposts%2Fnew-article"
```

### 2. Через CLI скрипт

```bash
# Отправить один URL
node scripts/submit-to-indexnow.js https://renohacks.com/posts/new-article

# Отправить несколько URL
node scripts/submit-to-indexnow.js \
  https://renohacks.com/posts/article1 \
  https://renohacks.com/posts/article2 \
  https://renohacks.com/posts/article3
```

### 3. Программно (в коде)

```typescript
import { submitToIndexNow, submitUrlToIndexNow } from "@/lib/indexnow"

// Отправить один URL
await submitUrlToIndexNow("https://renohacks.com/posts/new-article")

// Отправить несколько URL
await submitToIndexNow([
  "https://renohacks.com/posts/article1",
  "https://renohacks.com/posts/article2",
])
```

## 🔍 Проверка статуса

```bash
# Проверить конфигурацию IndexNow
curl https://renohacks.com/api/indexnow
```

## 📝 Когда использовать

Отправляйте URL в IndexNow когда:
- ✅ Публикуете новую статью
- ✅ Обновляете существующую статью
- ✅ Изменяете важный контент на странице
- ✅ Добавляете новые страницы

## ⚠️ Ограничения

- Максимум 10,000 URL за один запрос
- URL должны быть валидными (https:// или http://)
- Ключ должен быть доступен по адресу: `https://renohacks.com/506b8013c6ddcce134765ffa1fc1b102.txt`

## 🔗 Поддерживаемые поисковые системы

- ✅ Bing (Microsoft)
- ✅ Yandex
- ✅ IndexNow.org (общий endpoint)

## 📚 Дополнительная информация

- [IndexNow.org](https://www.indexnow.org/)
- [Bing Webmaster Tools - IndexNow](https://www.bing.com/indexnow)

