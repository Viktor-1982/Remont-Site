// src/lib/seo.ts
import type { Metadata } from "next"

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
    }
): Metadata {
    const baseUrl = "https://renohacks.com"
    const url = `${baseUrl}${path}`

    const isEnglishPath = path === "/en" || path.startsWith("/en/")
    const ruPath = isEnglishPath ? path.replace(/^\/en/, "") || "/" : path
    const enPath = isEnglishPath ? path : `/en${path === "/" ? "" : path}`

    const defaultImages = [cover ? `${baseUrl}${cover}` : `${baseUrl}/images/og-default.png`]
    const defaultLanguages = {
        ru: `${baseUrl}${ruPath}`,
        en: `${baseUrl}${enPath}`,
        "x-default": `${baseUrl}${ruPath}`,
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
            languages: {
                ...defaultLanguages,
                ...(alternates?.languages ?? {}),
            },
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
