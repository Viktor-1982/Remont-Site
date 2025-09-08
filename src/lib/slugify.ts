export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\wа-яё\s-]/gi, "") // убираем всё кроме букв, цифр, пробелов и дефисов
        .replace(/\s+/g, "-")          // пробелы → дефисы
}
