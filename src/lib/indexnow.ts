/**
 * IndexNow utility для уведомления поисковых систем об изменениях
 * Поддерживает Bing, Yandex и другие поисковые системы
 * Соответствует спецификации IndexNow: https://www.indexnow.org/
 */

const INDEXNOW_KEY = "506b8013c6ddcce134765ffa1fc1b102"
const INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

/**
 * Валидирует и нормализует URL согласно RFC-3986
 */
function validateAndNormalizeUrl(url: string): string | null {
    try {
        const parsed = new URL(url)
        // Проверяем, что протокол http или https
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
            return null
        }
        // Возвращаем нормализованный URL (URL конструктор автоматически кодирует)
        return parsed.toString()
    } catch {
        return null
    }
}

/**
 * Отправляет один URL через GET запрос (согласно спецификации IndexNow)
 * @param url - URL для индексации
 * @returns Promise с результатом отправки
 */
export async function submitSingleUrlViaGet(url: string): Promise<{ success: boolean; error?: string; statusCode?: number }> {
    const normalizedUrl = validateAndNormalizeUrl(url)
    if (!normalizedUrl) {
        return { success: false, error: "Invalid URL format" }
    }

    // URL должен быть URL-encoded для GET запроса
    const encodedUrl = encodeURIComponent(normalizedUrl)
    
    // Отправляем на все endpoints параллельно
    const results = await Promise.allSettled(
        INDEXNOW_ENDPOINTS.map((endpoint) => {
            const getUrl = `${endpoint}?url=${encodedUrl}&key=${INDEXNOW_KEY}`
            return fetch(getUrl, {
                method: "GET",
            })
        })
    )

    // Проверяем коды ответа согласно спецификации
    const successfulResults = results.filter((result) => {
        if (result.status === "fulfilled") {
            const status = result.value.status
            // 200 = OK, 202 = Accepted (key validation pending)
            return status === 200 || status === 202
        }
        return false
    })

    if (successfulResults.length > 0) {
        const statusCode = successfulResults[0].status === "fulfilled" 
            ? successfulResults[0].value.status 
            : undefined
        return { success: true, statusCode }
    }

    // Обрабатываем ошибки
    const firstRejected = results.find((r) => r.status === "rejected")
    if (firstRejected) {
        return { success: false, error: String(firstRejected.reason) }
    }

    const firstFulfilled = results.find((r) => r.status === "fulfilled")
    if (firstFulfilled && firstFulfilled.status === "fulfilled") {
        const status = firstFulfilled.value.status
        let error = "Unknown error"
        if (status === 400) error = "Bad request - Invalid format"
        else if (status === 403) error = "Forbidden - Key not valid"
        else if (status === 422) error = "Unprocessable Entity - URL doesn't belong to host"
        else if (status === 429) error = "Too Many Requests - Potential spam"
        return { success: false, error, statusCode: status }
    }

    return { success: false, error: "All IndexNow endpoints failed" }
}

/**
 * Отправляет множество URL через POST запрос (согласно спецификации IndexNow)
 * @param urls - Массив URL для индексации (до 10,000)
 * @returns Promise с результатом отправки
 */
export async function submitToIndexNow(urls: string[]): Promise<{ success: boolean; error?: string; statusCode?: number }> {
    if (!urls || urls.length === 0) {
        return { success: false, error: "No URLs provided" }
    }

    // Ограничение согласно спецификации: до 10,000 URL
    if (urls.length > 10000) {
        return { success: false, error: "Maximum 10,000 URLs per request" }
    }

    // Валидация и нормализация URL
    const validUrls = urls
        .map(validateAndNormalizeUrl)
        .filter((url): url is string => url !== null)

    if (validUrls.length === 0) {
        return { success: false, error: "No valid URLs provided" }
    }

    // Payload согласно спецификации IndexNow
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
                    "Content-Type": "application/json; charset=utf-8", // Согласно спецификации
                },
                body: JSON.stringify(payload),
            })
        )
    )

    // Проверяем коды ответа согласно спецификации
    const successfulResults = results.filter((result) => {
        if (result.status === "fulfilled") {
            const status = result.value.status
            // 200 = OK, 202 = Accepted (key validation pending)
            return status === 200 || status === 202
        }
        return false
    })

    if (successfulResults.length > 0) {
        const statusCode = successfulResults[0].status === "fulfilled" 
            ? successfulResults[0].value.status 
            : undefined
        return { success: true, statusCode }
    }

    // Обрабатываем ошибки
    const firstRejected = results.find((r) => r.status === "rejected")
    if (firstRejected) {
        return { success: false, error: String(firstRejected.reason) }
    }

    const firstFulfilled = results.find((r) => r.status === "fulfilled")
    if (firstFulfilled && firstFulfilled.status === "fulfilled") {
        const status = firstFulfilled.value.status
        let error = "Unknown error"
        if (status === 400) error = "Bad request - Invalid format"
        else if (status === 403) error = "Forbidden - Key not valid"
        else if (status === 422) error = "Unprocessable Entity - URL doesn't belong to host"
        else if (status === 429) error = "Too Many Requests - Potential spam"
        return { success: false, error, statusCode: status }
    }

    return { success: false, error: "All IndexNow endpoints failed" }
}

/**
 * Отправляет один URL в IndexNow
 * Использует POST метод (можно также использовать GET через submitSingleUrlViaGet)
 */
export async function submitUrlToIndexNow(url: string): Promise<{ success: boolean; error?: string; statusCode?: number }> {
    return submitToIndexNow([url])
}

