import { NextResponse } from "next/server"
import { allPosts } from ".contentlayer/generated"

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const path = url.searchParams.get("path") || "/"

        const isCurrentEn = path.startsWith("/en")
        const targetLocale = isCurrentEn ? "ru" : "en"
        const targetHome = targetLocale === "en" ? "/en" : "/"

        let targetUrl: string | null = null

        // --- 0. Главная ---
        if (path === "/" || path === "/en") {
            return NextResponse.json({ targetUrl: targetHome })
        }

        // --- 1. Посты ---
        function extractSlug(p: string) {
            if (!p) return null
            const clean = p.split("?")[0].split("#")[0]
            if (clean.startsWith("/en/posts/")) return clean.replace("/en/posts/", "")
            if (clean.startsWith("/posts/")) return clean.replace("/posts/", "")
            return null
        }

        const slug = extractSlug(path)
        if (slug) {
            const byTranslation = allPosts.find(
                (p) =>
                    (p.translationOf === slug || p.slug === slug) &&
                    p.locale === targetLocale
            )
            if (byTranslation) {
                targetUrl = byTranslation.url
            }
        }

        // --- 2. Калькуляторы ---
        if (
            !targetUrl &&
            (path.startsWith("/calculators") || path.startsWith("/en/calculators"))
        ) {
            const clean = path.replace(/^\/en/, "")
            targetUrl = targetLocale === "en" ? `/en${clean}` : clean
        }

        // --- 3. About ---
        if (!targetUrl && (path.startsWith("/about") || path.startsWith("/en/about"))) {
            targetUrl = targetLocale === "en" ? "/en/about" : "/about"
        }

        // --- 4. Индекс калькуляторов ---
        if (
            !targetUrl &&
            (path === "/calculators" || path === "/en/calculators")
        ) {
            targetUrl = targetLocale === "en" ? "/en/calculators" : "/calculators"
        }

        // --- 5. Fallback: всегда home ---
        if (!targetUrl) {
            targetUrl = targetHome
        }

        return NextResponse.json({ targetUrl })
    } catch {
        return NextResponse.json({ targetUrl: "/" }, { status: 200 })
    }
}
