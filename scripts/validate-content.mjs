import fs from "node:fs"
import path from "node:path"
import { allPosts } from "../.contentlayer/generated/index.mjs"

const publicDir = path.join(process.cwd(), "public")
const errors = []

const slugMap = new Map()
const urlMap = new Map()

const normalizeKey = (value) => value.trim().toLowerCase()

const reportError = (post, message) => {
    errors.push(`${post._raw.sourceFilePath}: ${message}`)
}

const fileExistsInPublic = (assetPath) => {
    const normalized = assetPath.split("?")[0]
    const fullPath = path.join(publicDir, normalized)
    return fs.existsSync(fullPath)
}

const imageRegexes = [
    /!\[[^\]]*\]\(([^)]+)\)/g,
    /<img[^>]+src=["']([^"']+)["']/g,
]

for (const post of allPosts) {
    if (!post.title?.trim()) reportError(post, "Missing title")
    if (!post.description?.trim()) reportError(post, "Missing description")
    if (!post.date) reportError(post, "Missing date")
    if (!post.slug?.trim()) reportError(post, "Missing slug")
    if (!post.locale?.trim()) reportError(post, "Missing locale")
    if (!post.cover?.trim()) reportError(post, "Missing cover")

    const slugKey = `${normalizeKey(post.locale)}:${normalizeKey(post.slug)}`
    slugMap.set(slugKey, (slugMap.get(slugKey) ?? 0) + 1)

    const urlKey = normalizeKey(post.url)
    urlMap.set(urlKey, (urlMap.get(urlKey) ?? 0) + 1)

    if (post.cover?.startsWith("/") && !fileExistsInPublic(post.cover)) {
        reportError(post, `Cover not found in public: ${post.cover}`)
    }

    const raw = post.body?.raw || ""
    for (const regex of imageRegexes) {
        let match
        while ((match = regex.exec(raw)) !== null) {
            const rawSrc = match[1]?.trim()
            if (!rawSrc || rawSrc.startsWith("http") || rawSrc.startsWith("data:")) continue
            const src = rawSrc.split(/\s+/)[0]
            if (!src.startsWith("/")) continue
            if (!fileExistsInPublic(src)) {
                reportError(post, `Image not found in public: ${src}`)
            }
        }
    }

    if (post.translationOf) {
        const targetLocale = post.locale === "ru" ? "en" : "ru"
        const hasMatch = allPosts.some(
            (candidate) =>
                candidate.locale === targetLocale &&
                normalizeKey(candidate.slug) === normalizeKey(post.translationOf)
        )
        if (!hasMatch) {
            reportError(
                post,
                `translationOf "${post.translationOf}" not found in ${targetLocale} posts`
            )
        }
    }
}

for (const [slugKey, count] of slugMap.entries()) {
    if (count > 1) {
        errors.push(`Duplicate slug for locale: ${slugKey}`)
    }
}

for (const [urlKey, count] of urlMap.entries()) {
    if (count > 1) {
        errors.push(`Duplicate url: ${urlKey}`)
    }
}

if (errors.length > 0) {
    throw new Error(
        `Content validation failed:\n${errors.map((err) => `- ${err}`).join("\n")}`
    )
}

console.log("Content validation passed.")

