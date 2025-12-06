"use client"

const STORAGE_KEY = "renohacks-views"

export interface ViewData {
    [slug: string]: {
        count: number
        lastViewed: number
    }
}

export function incrementView(slug: string, locale: "ru" | "en"): number {
    if (typeof window === "undefined") return 0

    const key = `${locale}-${slug}`
    const stored = localStorage.getItem(STORAGE_KEY)
    const views: ViewData = stored ? JSON.parse(stored) : {}

    if (!views[key]) {
        views[key] = { count: 0, lastViewed: 0 }
    }

    views[key].count += 1
    views[key].lastViewed = Date.now()

    localStorage.setItem(STORAGE_KEY, JSON.stringify(views))
    return views[key].count
}

export function getViewCount(slug: string, locale: "ru" | "en"): number {
    if (typeof window === "undefined") return 0

    const key = `${locale}-${slug}`
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return 0

    const views: ViewData = JSON.parse(stored)
    return views[key]?.count || 0
}

export function getAllViews(): ViewData {
    if (typeof window === "undefined") return {}

    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
}

export function getPopularPosts(
    posts: Array<{ slug: string; locale: string }>,
    limit: number = 5
): Array<{ slug: string; locale: string; views: number }> {
    if (typeof window === "undefined") return []

    const views = getAllViews()
    const postsWithViews = posts
        .map((post) => {
            const key = `${post.locale}-${post.slug}`
            return {
                slug: post.slug,
                locale: post.locale,
                views: views[key]?.count || 0,
            }
        })
        .filter((p) => p.views > 0)
        .sort((a, b) => b.views - a.views)
        .slice(0, limit)

    return postsWithViews
}

