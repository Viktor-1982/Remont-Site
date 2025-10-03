// src/lib/slugify.ts

/**
 * Преобразует строку в slug (чистый URL-friendly)
 * Убирает спецсимволы, пробелы → "-"
 * Поддерживает кириллицу и латиницу
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD") // убираем диакритику
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zа-я0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
}
