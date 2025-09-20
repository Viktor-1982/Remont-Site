export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\wа-яё\s-]/gi, "") // убираем всё лишнее
        .replace(/\s+/g, "-")          // пробелы → дефисы
        .replace(/-+/g, "-")           // несколько дефисов → один
        .replace(/^-+/, "")            // убираем дефисы в начале
        .replace(/-+$/, "")            // убираем дефисы в конце
}
