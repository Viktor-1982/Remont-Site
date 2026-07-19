// src/lib/seo.ts
import type { Metadata } from "next"

const baseUrl = "https://renohacks.com"

/**
 * Maps asymmetric paths (smety/costs) to their canonical equivalents.
 * All EN canonical URLs are WITHOUT the /en/ prefix (EN is the primary language).
 */
const pathLocaleMap: Record<string, { ru: string; en: string }> = {
    "/ru/smety":  { ru: "/ru/smety", en: "/costs" },
    "/costs":     { ru: "/ru/smety", en: "/costs" },
    "/en/costs":  { ru: "/ru/smety", en: "/costs" },
}

/**
 * Resolves canonical EN and RU paths for a given URL.
 *
 * Rules:
 *  - English (primary language) → no locale prefix:  /about, /calculators, /
 *  - Russian                    → /ru/ prefix:        /ru/about, /ru/calculators, /ru
 *  - /en/* paths are treated as EN (backward-compat rewrites), stripped to canonical form
 */
function resolveLocalePaths(path: string): { ru: string; en: string } {
    const mapped = pathLocaleMap[path]
    if (mapped) return mapped

    const isRuPath = path === "/ru" || path.startsWith("/ru/")
    const isEnPath = path === "/en" || path.startsWith("/en/")

    // Strip any locale prefix to get the base path
    let base = path
    if (isRuPath) base = path.replace(/^\/ru/, "") || "/"
    else if (isEnPath) base = path.replace(/^\/en/, "") || "/"

    const enPath = base === "/" ? "/" : base           // /about, /calculators/tile …
    const ruPath = base === "/" ? "/ru" : `/ru${base}` // /ru/about, /ru/calculators/tile …

    return { en: enPath, ru: ruPath }
}

/**
 * SEO metadata for static pages (About, Calculators, topic hubs, etc.)
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
    const isRuPage = path === "/ru" || path.startsWith("/ru/")

    // Canonical URL: RU pages use /ru/... EN pages use bare path (no /en/)
    const canonicalPath = isRuPage ? localePaths.ru : localePaths.en
    const url = `${baseUrl}${canonicalPath}`

    const defaultImages = [cover ? `${baseUrl}${cover}` : `${baseUrl}/images/og-default.png`]

    // hreflang alternate languages
    // x-default always points to EN (primary language) per Google best practices
    const defaultLanguages = autoAlternateLanguages === false
        ? undefined
        : {
            "ru":        `${baseUrl}${localePaths.ru}`,
            "en":        `${baseUrl}${localePaths.en}`,
            "x-default": `${baseUrl}${localePaths.en}`,  // EN = primary language ✅
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
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    }
}
