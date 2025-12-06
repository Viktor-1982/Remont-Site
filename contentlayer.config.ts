import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import readingTime from "reading-time"

/**
 * Конфигурация типа Post для контента Renohacks.com
 * Работает с двумя папками:
 *   /content/posts/...         → RU
 *   /content/posts/en/...      → EN
 */

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: "**/*.mdx",
    contentType: "mdx",
    fields: {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
        date: { type: "date", required: true },
        tags: { type: "list", of: { type: "string" } },
        cover: { type: "string", required: true },
        author: { type: "string", required: true },
        translationOf: { type: "string" },
        draft: { type: "boolean", default: false },
        keywords: { type: "list", of: { type: "string" } },
    },

    computedFields: {
        // 🧭 Язык статьи: en или ru
        locale: {
            type: "string",
            resolve: (post) =>
                /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath) ? "en" : "ru",
        },

        // 🔗 Слаг — используется для slug и url
        slug: {
            type: "string",
            resolve: (post) =>
                post._raw.flattenedPath
                    .replace(/^posts[\\/]/, "")
                    .replace(/^en[\\/]/, ""),
        },

        // 🌐 Полный URL статьи
        url: {
            type: "string",
            resolve: (post) =>
                /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath)
                    ? `/en/posts/${post._raw.flattenedPath.replace(/^en[\\/]/, "")}`
                    : `/posts/${post._raw.flattenedPath}`,
        },

        // ⏱️ Время чтения
        // Вычисляем время чтения с учетом реальной скорости чтения для каждого языка
        // Русский: ~180 слов/мин (более медленное чтение из-за сложности языка)
        // Английский: ~200 слов/мин (стандартная скорость)
        readingTime: {
            type: "string",
            resolve: (post) => {
                const isEnglish = /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath)
                // Настраиваем скорость чтения в зависимости от языка
                const wordsPerMinute = isEnglish ? 200 : 180
                const time = readingTime(post.body.raw, { wordsPerMinute })
                return Math.ceil(time.minutes) + " мин"
            },
        },

        // 📚 Оглавление для TableOfContents
        headings: {
            type: "json",
            resolve: (doc) =>
                Array.from(doc.body.raw.matchAll(/^(##+)\s+(.*)$/gm)).map(
                    ([, markers, text]) => ({
                        text,
                        level: markers.length, // ## = 2, ### = 3
                    })
                ),
        },
    },
}))

export default makeSource({
    contentDirPath: "content/posts",
    documentTypes: [Post],
})
