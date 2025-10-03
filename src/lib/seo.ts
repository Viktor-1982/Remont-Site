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
    }: { title: string; description: string; cover?: string; type?: "website" | "article" }
): Metadata {
    const baseUrl = "https://renohacks.com"
    const url = `${baseUrl}${path}`

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                ru: baseUrl,
                en: `${baseUrl}/en`,
                "x-default": baseUrl,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Renohacks",
            type: type ?? "website",
            images: [cover ? `${baseUrl}${cover}` : `${baseUrl}/images/og-default.png`],
        },
    }
}
