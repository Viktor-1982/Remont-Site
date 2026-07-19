// src/lib/seo.ts
import type { Metadata } from "next"

const baseUrl = "https://renohacks.com"

const pathLocaleMap: Record<string, { ru: string; en: string }> = {
    "/ru/smety": { ru: "/ru/smety", en: "/en/costs" },
    "/costs": { ru: "/ru/smety", en: "/en/costs" },
    "/en/costs": { ru: "/ru/smety", en: "/en/costs" },
}

function resolveLocalePaths(path: string) {
    const mapped = pathLocaleMap[path]
    if (mapped) return mapped

    const isRussianPath = path === "/ru" || path.startsWith("/ru/")
    const isEnglishPath = path === "/en" || path.startsWith("/en/")

    let base = path
    if (isRussianPath) {
        base = path.replace(/^\/ru/, "") || "/"
    } else if (isEnglishPath) {
        base = path.replace(/^\/en/, "") || "/"
    }

    const enPath = `/en${base === "/" ? "" : base}`
    const ruPath = `/ru${base === "/" ? "" : base}`
    return { ru: ruPath, en: enPath }
}

/**
 * SEO для обычных статичных страниц (About, Calculators и т.д.)
 */
export function getPageMetadata(
    path: string,
    {
        title,
        description,
        cover,
        type,
        alternates,
        openGraph,
        twitter,
        keywords,
        robots,
        autoAlternateLanguages,
    }: {
        title: string
        description: string
        cover?: string
        type?: "website" | "article"
        alternates?: Metadata["alternates"]
        openGraph?: Metadata["openGraph"]
        twitter?: Metadata["twitter"]
        keywords?: Metadata["keywords"]
        robots?: Metadata["robots"]
        autoAlternateLanguages?: boolean
    }
): Metadata {
    const localePaths = resolveLocalePaths(path)
    const isRussianPath = path === "/ru" || path.startsWith("/ru/")
    const canonicalPath = isRussianPath ? localePaths.ru : localePaths.en
    const url = `${baseUrl}${canonicalPath}`

    const defaultImages = [cover ? `${baseUrl}${cover}` : `${baseUrl}/images/og-default.png`]
    const defaultLanguages = autoAlternateLanguages === false
        ? undefined
        : {
            "ru-RU": `${baseUrl}${localePaths.ru}`,
            "en-US": `${baseUrl}${localePaths.en}`,
            "x-default": `${baseUrl}${localePaths.en}`,
        }

    const baseOpenGraph: NonNullable<Metadata["openGraph"]> = {
        title,
        description,
        url,
        siteName: "Renohacks",
        type: type ?? "website",
        images: defaultImages,
    }

    const mergedOpenGraph: Metadata["openGraph"] = {
        ...baseOpenGraph,
        ...openGraph,
        images: openGraph?.images ?? baseOpenGraph.images,
    }

    const baseTwitter: NonNullable<Metadata["twitter"]> = {
        card: "summary_large_image",
        title,
        description,
        images: defaultImages,
    }

    const mergedTwitter: Metadata["twitter"] = {
        ...baseTwitter,
        ...twitter,
        images: twitter?.images ?? baseTwitter.images,
    }

    return {
        title,
        description,
        alternates: {
            ...(alternates ?? {}),
            canonical: alternates?.canonical ?? url,
            ...(defaultLanguages || alternates?.languages
                ? {
                    languages: {
                        ...(defaultLanguages ?? {}),
                        ...(alternates?.languages ?? {}),
                    },
                }
                : {}),
        },
        openGraph: mergedOpenGraph,
        twitter: mergedTwitter,
        keywords,
        robots: robots ?? {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
            },
        },
    }
}
