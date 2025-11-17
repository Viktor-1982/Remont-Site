// ✅ Утилита для rate limiting API endpoints
// Защита от brute-force атак, DDoS и злоупотреблений

interface RateLimitEntry {
    count: number
    resetTime: number
}

// Хранилище rate limit данных (в памяти)
// ⚠️ В продакшене рекомендуется использовать Redis для multi-server окружения
const rateLimitStore = new Map<string, RateLimitEntry>()

// Очистка устаревших записей каждые 5 минут
const CLEANUP_INTERVAL = 5 * 60 * 1000
let lastCleanup = Date.now()

/**
 * Очищает устаревшие записи из хранилища
 */
function cleanupExpiredEntries(): void {
    const now = Date.now()
    if (now - lastCleanup < CLEANUP_INTERVAL) return
    
    lastCleanup = now
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key)
        }
    }
}

/**
 * Получает IP адрес из запроса
 */
function getClientIdentifier(req: Request): string {
    // Пробуем получить IP из заголовков (за прокси/Vercel)
    const forwardedFor = req.headers.get("x-forwarded-for")
    if (forwardedFor) {
        // Берем первый IP из списка (реальный IP клиента)
        return forwardedFor.split(",")[0].trim()
    }
    
    const realIp = req.headers.get("x-real-ip")
    if (realIp) {
        return realIp
    }
    
    // Fallback: используем User-Agent если IP недоступен (для разработки)
    const userAgent = req.headers.get("user-agent") || "unknown"
    return `fallback:${userAgent.slice(0, 50)}`
}

export interface RateLimitConfig {
    /** Максимальное количество запросов */
    maxRequests: number
    /** Временное окно в миллисекундах */
    windowMs: number
    /** Сообщение об ошибке при превышении лимита */
    message?: string
    /** Использовать IP для идентификации (по умолчанию true) */
    useIp?: boolean
    /** Дополнительный идентификатор (например, пользователь ID) */
    identifier?: string
}

export interface RateLimitResult {
    /** Лимит не превышен */
    success: boolean
    /** Количество оставшихся запросов */
    remaining: number
    /** Время до сброса лимита (в миллисекундах) */
    resetTime: number
    /** Сообщение об ошибке */
    message?: string
}

/**
 * Проверяет rate limit для запроса
 */
export function checkRateLimit(
    req: Request,
    config: RateLimitConfig
): RateLimitResult {
    // Очистка устаревших записей
    cleanupExpiredEntries()
    
    // Определяем идентификатор клиента
    const baseIdentifier = config.useIp !== false 
        ? getClientIdentifier(req) 
        : "global"
    
    const identifier = config.identifier 
        ? `${baseIdentifier}:${config.identifier}`
        : baseIdentifier
    
    const key = identifier
    const now = Date.now()
    
    // Получаем текущую запись
    let entry = rateLimitStore.get(key)
    
    // Если запись не существует или истекла, создаем новую
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        }
    }
    
    // Увеличиваем счетчик
    entry.count++
    rateLimitStore.set(key, entry)
    
    // Проверяем лимит
    if (entry.count > config.maxRequests) {
        return {
            success: false,
            remaining: 0,
            resetTime: entry.resetTime,
            message: config.message || `Rate limit exceeded. Try again in ${Math.ceil((entry.resetTime - now) / 1000)} seconds.`,
        }
    }
    
    return {
        success: true,
        remaining: Math.max(0, config.maxRequests - entry.count),
        resetTime: entry.resetTime,
    }
}

/**
 * Получает статистику rate limit для отладки
 */
export function getRateLimitStats(): {
    activeEntries: number
    totalRequests: number
} {
    cleanupExpiredEntries()
    
    let totalRequests = 0
    for (const entry of rateLimitStore.values()) {
        totalRequests += entry.count
    }
    
    return {
        activeEntries: rateLimitStore.size,
        totalRequests,
    }
}

/**
 * Сброс rate limit для конкретного идентификатора (для админских целей)
 */
export function resetRateLimit(identifier: string): void {
    rateLimitStore.delete(identifier)
}

