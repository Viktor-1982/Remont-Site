// ✅ Утилита для управления сессиями администратора
// В продакшене рекомендуется использовать Redis или базу данных вместо Map

interface AdminSession {
    token: string
    createdAt: number
    expiresAt: number
}

// Хранилище активных сессий (в памяти)
// ⚠️ В продакшене замените на Redis или базу данных
const sessions = new Map<string, AdminSession>()

// Время жизни сессии (8 часов)
const SESSION_DURATION = 8 * 60 * 60 * 1000

// Название cookie
export const ADMIN_SESSION_COOKIE = "admin_session"

/**
 * Создает новую сессию администратора
 */
export function createSession(): string {
    const token = crypto.randomUUID()
    const now = Date.now()
    
    sessions.set(token, {
        token,
        createdAt: now,
        expiresAt: now + SESSION_DURATION,
    })
    
    // Очистка устаревших сессий (раз в 100 созданий)
    if (sessions.size % 100 === 0) {
        cleanupExpiredSessions()
    }
    
    return token
}

/**
 * Проверяет валидность сессии
 */
export function validateSession(token: string | null | undefined): boolean {
    if (!token) return false
    
    const session = sessions.get(token)
    if (!session) return false
    
    // Проверка на истечение
    if (Date.now() > session.expiresAt) {
        sessions.delete(token)
        return false
    }
    
    // Обновляем время истечения при активности
    session.expiresAt = Date.now() + SESSION_DURATION
    
    return true
}

/**
 * Удаляет сессию
 */
export function deleteSession(token: string | null | undefined): void {
    if (token) {
        sessions.delete(token)
    }
}

/**
 * Очищает устаревшие сессии
 */
function cleanupExpiredSessions(): void {
    const now = Date.now()
    for (const [token, session] of sessions.entries()) {
        if (now > session.expiresAt) {
            sessions.delete(token)
        }
    }
}

/**
 * Получает количество активных сессий (для мониторинга)
 */
export function getActiveSessionsCount(): number {
    cleanupExpiredSessions()
    return sessions.size
}

