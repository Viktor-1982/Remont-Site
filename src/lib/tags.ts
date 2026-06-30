import type { Post } from ".contentlayer/generated"

export type TagLocale = "ru" | "en"

type TagInfo = {
    slug: string
    count: number
    variants: Set<string>
}

const specialDisplayNames: Record<TagLocale, Record<string, string>> = {
    ru: {
        diy: "DIY",
        novinki: "Новинки",
    },
    en: {
        diy: "DIY",
        "soft minimal": "Soft Minimal",
    },
}

export function normalizeTag(tag: string) {
    return tag.trim().toLocaleLowerCase()
}

function isLocalePost(post: Post, locale: TagLocale) {
    return locale === "ru" ? post.url.startsWith("/ru/") : !post.url.startsWith("/ru/")
}

export function collectTagInfo(posts: Post[], locale: TagLocale) {
    const info = new Map<string, TagInfo>()

    posts.forEach((post) => {
        if (post.draft || !isLocalePost(post, locale) || !post.tags) return

        post.tags.forEach((tag) => {
            const slug = normalizeTag(tag)
            if (!slug) return

            const existing = info.get(slug)
            if (existing) {
                existing.count += 1
                existing.variants.add(tag.trim())
                return
            }

            info.set(slug, {
                slug,
                count: 1,
                variants: new Set([tag.trim()]),
            })
        })
    })

    return info
}

export function getTagDisplayName(
    slug: string,
    locale: TagLocale,
    variants?: Iterable<string>
) {
    const special = specialDisplayNames[locale][slug]
    if (special) return special

    const variantList = variants ? Array.from(variants).filter(Boolean) : []
    const exactLowercase = variantList.find((variant) => normalizeTag(variant) === slug && variant === slug)

    return exactLowercase ?? slug
}

export function getTagCloudData(posts: Post[], locale: TagLocale) {
    const info = collectTagInfo(posts, locale)
    const counts = Array.from(info.values()).map((item) => item.count)
    const maxCount = counts.length ? Math.max(...counts) : 1
    const minCount = counts.length ? Math.min(...counts) : 1
    const range = maxCount - minCount || 1

    return Array.from(info.values())
        .map((item) => {
            const normalized = (item.count - minCount) / range
            const size = Math.max(1, Math.min(5, Math.ceil(normalized * 4) + 1))

            return {
                slug: item.slug,
                name: getTagDisplayName(item.slug, locale, item.variants),
                count: item.count,
                size,
            }
        })
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, locale))
}

export function getCanonicalTagSlugs(posts: Post[], locale: TagLocale) {
    const slugs = Array.from(collectTagInfo(posts, locale).keys())
    if (locale === "ru" && !slugs.includes("novinki")) slugs.push("novinki")
    return slugs.sort((a, b) => a.localeCompare(b, locale))
}

export function getStaticTagParams(posts: Post[], locale: TagLocale) {
    const params = new Set<string>()
    const canonical = getCanonicalTagSlugs(posts, locale)

    canonical.forEach((slug) => params.add(slug))

    posts.forEach((post) => {
        if (post.draft || !isLocalePost(post, locale) || !post.tags) return
        post.tags.forEach((tag) => {
            const trimmed = tag.trim()
            if (trimmed) params.add(trimmed)
        })
    })

    if (locale === "ru") params.add("novinki")

    return Array.from(params).map((tag) => ({ tag }))
}

export function findTagDisplayName(posts: Post[], locale: TagLocale, slug: string) {
    const info = collectTagInfo(posts, locale).get(slug)
    return getTagDisplayName(slug, locale, info?.variants)
}

function getPostsByLocale(posts: Post[], locale: TagLocale) {
    return posts.filter((post) => !post.draft && isLocalePost(post, locale))
}

function buildLocaleSlugMap(posts: Post[], locale: TagLocale) {
    return new Map(getPostsByLocale(posts, locale).map((post) => [post.slug, post]))
}

function findTranslatedPost(
    source: Post,
    targetPostsBySlug: Map<string, Post>,
    targetLocalePosts: Post[]
) {
    if (source.translationOf) {
        const direct = targetPostsBySlug.get(source.translationOf)
        if (direct) return direct
    }

    return targetLocalePosts.find((candidate) => candidate.translationOf === source.slug)
}

export function findAlternateTagSlug(
    posts: Post[],
    sourceLocale: TagLocale,
    sourceSlug: string,
    targetLocale: TagLocale
) {
    if (sourceLocale === targetLocale) return sourceSlug

    const sourcePosts = getPostsByLocale(posts, sourceLocale).filter((post) =>
        post.tags?.map((tag) => normalizeTag(tag)).includes(sourceSlug)
    )

    if (sourcePosts.length === 0) return null

    const targetLocalePosts = getPostsByLocale(posts, targetLocale)
    const targetPostsBySlug = buildLocaleSlugMap(posts, targetLocale)
    const alignedTargetTagCounts = new Map<string, number>()
    const targetTagCounts = new Map<string, number>()

    sourcePosts.forEach((post) => {
        const translated = findTranslatedPost(post, targetPostsBySlug, targetLocalePosts)
        if (!translated?.tags?.length) return

        post.tags?.forEach((tag, index) => {
            if (normalizeTag(tag) !== sourceSlug) return
            const alignedTag = translated.tags?.[index]
            if (!alignedTag) return

            const normalizedAlignedTag = normalizeTag(alignedTag)
            if (!normalizedAlignedTag) return

            alignedTargetTagCounts.set(
                normalizedAlignedTag,
                (alignedTargetTagCounts.get(normalizedAlignedTag) ?? 0) + 1
            )
        })

        translated.tags.forEach((tag) => {
            const normalized = normalizeTag(tag)
            if (!normalized) return
            targetTagCounts.set(normalized, (targetTagCounts.get(normalized) ?? 0) + 1)
        })
    })

    const primaryCounts = alignedTargetTagCounts.size > 0 ? alignedTargetTagCounts : targetTagCounts

    if (primaryCounts.size === 0) return null

    return Array.from(primaryCounts.entries()).sort(
        (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], targetLocale)
    )[0]?.[0] ?? null
}
