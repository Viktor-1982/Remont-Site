import type { Post } from ".contentlayer/generated"

export interface ViewHistoryItem {
    slug: string
    locale: "ru" | "en"
    title: string
    cover?: string
    viewedAt: number // timestamp
}

const STORAGE_KEY = "renohacks-view-history"
const MAX_HISTORY_ITEMS = 20 // Максимальное количество статей в истории

/**
 * Добавляет статью в историю просмотров
 */
export function addToViewHistory(post: Post): void {
    if (typeof window === "undefined") return

    try {
        const existing = getViewHistory()
        
        // Удаляем дубликаты (если статья уже есть в истории)
        const filtered = existing.filter(
            (item) => !(item.slug === post.slug && item.locale === post.locale)
        )
        
        // Добавляем новую статью в начало
        const newItem: ViewHistoryItem = {
            slug: post.slug,
            locale: post.locale as "ru" | "en",
            title: post.title,
            cover: post.cover,
            viewedAt: Date.now(),
        }
        
        const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS)
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (error) {
        console.error("Failed to save view history:", error)
    }
}

/**
 * Получает историю просмотров
 */
export function getViewHistory(): ViewHistoryItem[] {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return []
        
        const parsed = JSON.parse(stored) as ViewHistoryItem[]
        // Фильтруем старые записи (старше 30 дней)
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
        return parsed.filter((item) => item.viewedAt > thirtyDaysAgo)
    } catch (error) {
        console.error("Failed to read view history:", error)
        return []
    }
}

/**
 * Получает историю просмотров для конкретного языка
 */
export function getViewHistoryByLocale(locale: "ru" | "en"): ViewHistoryItem[] {
    return getViewHistory().filter((item) => item.locale === locale)
}

/**
 * Очищает историю просмотров
 */
export function clearViewHistory(): void {
    if (typeof window === "undefined") return
    
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        console.error("Failed to clear view history:", error)
    }
}

/**
 * Удаляет конкретную статью из истории
 */
export function removeFromViewHistory(slug: string, locale: "ru" | "en"): void {
    if (typeof window === "undefined") return

    try {
        const existing = getViewHistory()
        const filtered = existing.filter(
            (item) => !(item.slug === slug && item.locale === locale)
        )
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
        console.error("Failed to remove from view history:", error)
    }
}

