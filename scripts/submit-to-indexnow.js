#!/usr/bin/env node

/**
 * Скрипт для отправки URL в IndexNow
 * Использование: node scripts/submit-to-indexnow.js <url1> [url2] [url3] ...
 */

const INDEXNOW_KEY = "506b8013c6ddcce134765ffa1fc1b102"
const INDEXNOW_ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

async function submitToIndexNow(urls) {
    if (!urls || urls.length === 0) {
        console.error("❌ No URLs provided")
        process.exit(1)
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
        console.error("❌ No valid URLs provided")
        process.exit(1)
    }

    const payload = {
        host: "renohacks.com",
        key: INDEXNOW_KEY,
        keyLocation: "https://renohacks.com/506b8013c6ddcce134765ffa1fc1b102.txt",
        urlList: validUrls,
    }

    console.log(`🚀 Submitting ${validUrls.length} URL(s) to IndexNow...`)
    console.log(`📋 URLs:`, validUrls.join(", "))

    // Отправляем на все endpoints параллельно
    const results = await Promise.allSettled(
        INDEXNOW_ENDPOINTS.map(async (endpoint) => {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
            return { endpoint, status: response.status, ok: response.ok }
        })
    )

    // Выводим результаты
    let hasSuccess = false
    results.forEach((result, index) => {
        if (result.status === "fulfilled" && result.value.ok) {
            console.log(`✅ ${INDEXNOW_ENDPOINTS[index]}: Success`)
            hasSuccess = true
        } else {
            const error =
                result.status === "rejected"
                    ? result.reason.message
                    : `Status ${result.value?.status}`
            console.log(`❌ ${INDEXNOW_ENDPOINTS[index]}: ${error}`)
        }
    })

    if (hasSuccess) {
        console.log(`\n✅ Successfully submitted URLs to IndexNow!`)
        process.exit(0)
    } else {
        console.log(`\n❌ Failed to submit URLs to IndexNow`)
        process.exit(1)
    }
}

// Получаем URL из аргументов командной строки
const urls = process.argv.slice(2)

if (urls.length === 0) {
    console.error("❌ Usage: node scripts/submit-to-indexnow.js <url1> [url2] [url3] ...")
    console.error("Example: node scripts/submit-to-indexnow.js https://renohacks.com/posts/new-article")
    process.exit(1)
}

submitToIndexNow(urls).catch((error) => {
    console.error("❌ Error:", error)
    process.exit(1)
})

