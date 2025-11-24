/**
 * IndexNow utility для уведомления поисковых систем об изменениях
 * Поддерживает Bing, Yandex и другие поисковые системы
 */

const INDEXNOW_KEY = "506b8013c6ddcce134765ffa1fc1b102"
const INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

/**
 * Отправляет URL в IndexNow для мгновенной индексации
 * @param urls - Массив URL для индексации
 * @returns Promise с результатом отправки
 */
export async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; error?: string }> {
    if (!urls || urls.length === 0) {
        return { success: false, error: "No URLs provided" }
    }

    // Валидация URL
    const validUrls = urls.filter((url) => {
        try {
            const parsed = new URL(url)
            return parsed.protocol === "https:" || parsed.protocol === "http:"
        } catch {
            return false
        }
    })

    if (validUrls.length === 0) {
        return { success: false, error: "No valid URLs provided" }
    }

    const payload = {
        host: "renohacks.com",
        key: INDEXNOW_KEY,
        keyLocation: "https://renohacks.com/506b8013c6ddcce134765ffa1fc1b102.txt",
        urlList: validUrls,
    }

    // Отправляем на все endpoints параллельно
    const results = await Promise.allSettled(
        INDEXNOW_ENDPOINTS.map((endpoint) =>
            fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
        )
    )

    // Проверяем, есть ли хотя бы один успешный ответ
    const hasSuccess = results.some(
        (result) => result.status === "fulfilled" && result.value.status === 200
    )

    if (hasSuccess) {
        return { success: true }
    }

    // Если все запросы провалились, возвращаем первую ошибку
    const firstError = results.find((r) => r.status === "rejected")
    return {
        success: false,
        error: firstError
            ? String(firstError.reason)
            : "All IndexNow endpoints failed",
    }
}

/**
 * Отправляет один URL в IndexNow
 */
export async function submitUrlToIndexNow(url: string): Promise<{ success: boolean; error?: string }> {
    return submitToIndexNow([url])
}

