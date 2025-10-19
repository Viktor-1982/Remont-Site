import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import readingTime from "reading-time"

/**
 * 🧱 Конфигурация типа Post для Renohacks.com
 * Поддерживает двуязычную структуру:
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
        // 🌍 Определяем язык статьи
        locale: {
            type: "string",
            resolve: (post) =>
                /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath) ? "en" : "ru",
        },

        // 🧭 Слаг без /posts/ и /en/
        slug: {
            type: "string",
            resolve: (post) =>
                post._raw.flattenedPath
                    .replace(/^posts[\\/]/, "")
                    .replace(/^en[\\/]/, ""),
        },

        // 🌐 Полный URL
        url: {
            type: "string",
            resolve: (post) =>
                /(^|[\\/])en[\\/]/.test(post._raw.sourceFilePath)
                    ? `/en/posts/${post._raw.flattenedPath.replace(/^en[\\/]/, "")}`
                    : `/posts/${post._raw.flattenedPath}`,
        },

        // ⏱️ Время чтения
        readingTime: {
            type: "string",
            resolve: (post) =>
                Math.ceil(readingTime(post.body.raw).minutes) + " мин",
        },

        // 📚 Извлечение заголовков для оглавления (ToC)
        headings: {
            type: "json",
            resolve: (doc) => {
                const headingRegex = /^#{2,3}\s+(?:[^\wА-Яа-я]*)(.+)$/gmu
                const matches = Array.from(doc.body.raw.matchAll(headingRegex))

                return matches.map(([, text]) => {
                    const level = text.startsWith("#") ? 3 : 2
                    return {
                        text: text.trim(),
                        level,
                    }
                })
            },
        },
    },
}))

export default makeSource({
    contentDirPath: "content/posts",
    documentTypes: [Post],
})
