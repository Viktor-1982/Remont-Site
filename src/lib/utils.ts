// src/lib/utils.ts
import type { Post } from ".contentlayer/generated"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Объединяет className (clsx + tailwind-merge)
 * Используется во всех UI-компонентах
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs))
}

/**
 * Форматирует дату по локали
 */
export function formatDate(date: string, locale: "ru" | "en"): string {
    return new Date(date).toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
}

/**
 * Определяем локаль по pathname (только URL)
 */
export function getLocaleFromPath(path: string): "ru" | "en" {
    if (path.startsWith("/en") || path.includes("-en")) return "en"
    return "ru"
}

/**
 * Сортировка постов по дате (новые выше)
 */
export function sortPosts(posts: Post[]): Post[] {
    return posts
        .filter((p) => !p.draft)
        .sort((a, b) => {
            const ta = a.date ? new Date(a.date).getTime() : 0
            const tb = b.date ? new Date(b.date).getTime() : 0
            return tb - ta
        })
}
