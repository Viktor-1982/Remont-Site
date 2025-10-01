import { defineDocumentType, makeSource } from "contentlayer2/source-files"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"
import remarkMdxImages from "remark-mdx-images"
import GitHubSlugger from "github-slugger"

// =============================
// Helpers
// =============================
const toDate = (input?: string | Date | null) => {
    if (!input) return null
    const d = new Date(input as string)
    return isNaN(d.getTime()) ? null : d
}

const estimateReadingTime = (text: string) => {
    const words = (text || "")
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .filter(Boolean).length
    const minutes = Math.max(1, Math.round(words / 200))
    return { words, minutes }
}

function extractHeadings(raw: string) {
    const lines = raw.split(/\n/)
    const out: { level: number; text: string; slug: string }[] = []
    const slugger = new GitHubSlugger()
    slugger.reset()
    for (const line of lines) {
        const m2 = line.match(/^##\s+(.+)/)
        const m3 = line.match(/^###\s+(.+)/)
        const hit = m2
            ? { level: 2, text: m2[1].trim() }
            : m3
                ? { level: 3, text: m3[1].trim() }
                : null
        if (hit) {
            out.push({
                level: hit.level,
                text: hit.text,
                slug: slugger.slug(hit.text),
            })
        }
    }
    return out
}

// =============================
// Post Document
// =============================
export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `{posts,en/posts}/**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: { type: "string", required: true },
        description: { type: "string", required: true },
        date: { type: "date", required: true },
        updated: { type: "date", required: false },
        cover: { type: "string", required: false },
        tags: { type: "list", of: { type: "string" } },
        draft: { type: "boolean", default: false },
        author: { type: "string", default: "Renohacks" },
        alternates: { type: "json", required: false },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (doc) => {
                // RU → my-post
                // EN → en/my-post
                if (doc._raw.flattenedPath.startsWith("en/posts/")) {
                    return `en/${doc._raw.flattenedPath.replace(/^en\/posts\//, "")}`
                }
                return doc._raw.flattenedPath.replace(/^posts\//, "")
            },
        },
        url: {
            type: "string",
            resolve: (doc) => {
                if (doc._raw.flattenedPath.startsWith("en/posts/")) {
                    // будет /en/posts/slug
                    return `/en/posts/${doc._raw.flattenedPath.replace(/^en\/posts\//, "")}`
                }
                // будет /posts/slug
                return `/posts/${doc._raw.flattenedPath.replace(/^posts\//, "")}`
            },
        },
        dateParsed: { type: "date", resolve: (doc) => toDate(doc.date) },
        updatedParsed: {
            type: "date",
            resolve: (doc) => toDate((doc as any).updated || null),
        },
        headings: { type: "json", resolve: (doc) => extractHeadings(doc.body.raw) },
        readingTime: {
            type: "json",
            resolve: (doc) => estimateReadingTime(doc.body.raw),
        },
    },
}))

// =============================
// Source
// =============================
export default makeSource({
    contentDirPath: "content",
    documentTypes: [Post],
    disableImportAliasWarning: true,
    mdx: {
        remarkPlugins: [remarkGfm, remarkMdxImages],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
    },
})
