// src/lib/seo.ts
import type { Metadata } from "next"

const baseUrl = "https://renohacks.com"

const pathLocaleMap: Record<string, { ru: string; en: string }> = {
    "/smety": { ru: "/smety", en: "/en/costs" },
    "/en/costs": { ru: "/smety", en: "/en/costs" },
}

function resolveLocalePaths(path: string) {
    const mapped = pathLocaleMap[path]
    if (mapped) return mapped

    const isEnglishPath = path === "/en" || path.startsWith("/en/")
    const ruPath = isEnglishPath ? path.replace(/^\/en/, "") || "/" : path
    const enPath = isEnglishPath ? path : `/en${path === "/" ? "" : path}`
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
    const url = `${baseUrl}${path}`
    const localePaths = resolveLocalePaths(path)

    const defaultImages = [cover ? `${baseUrl}${cover}` : `${baseUrl}/images/og-default.png`]
    const defaultLanguages = autoAlternateLanguages === false
        ? undefined
        : {
            ru: `${baseUrl}${localePaths.ru}`,
            en: `${baseUrl}${localePaths.en}`,
            "x-default": `${baseUrl}${localePaths.ru}`,
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
