import { NextResponse } from "next/server"
import { allPosts } from ".contentlayer/generated"

export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const path = (url.searchParams.get("path") || "/")
            .split("?")[0]
            .split("#")[0]

        const isEnglish = /^\/en(\/|$)/.test(path)
        const targetLocale = isEnglish ? "ru" : "en"
        let targetUrl: string | null = null

        // ==========================================================
        // 🔹 1. Посты (через translationOf / slug / locale)
        // ==========================================================
        function extractSlug(p: string) {
            const clean = p.split("?")[0].split("#")[0]
            if (clean.startsWith("/en/posts/")) return clean.replace("/en/posts/", "")
            if (clean.startsWith("/posts/")) return clean.replace("/posts/", "")
            return null
        }

        const slug = extractSlug(path)
        if (slug) {
            const current = allPosts.find((p) => p.slug === slug)

            if (current) {
                const key = current.translationOf || current.slug
                const mirror = allPosts.find(
                    (p) =>
                        (p.translationOf === key || p.slug === key) &&
                        p.locale !== current.locale
                )
                if (mirror) targetUrl = mirror.url
            }
        }

        // ==========================================================
        // 🔹 2. About
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?about/.test(path)) {
            targetUrl = targetLocale === "en" ? "/en/about" : "/about"
        }

        // ==========================================================
        // 🔹 3. 404 / Not-found
        // ==========================================================
        if (!targetUrl && /(404|not-found)/.test(path)) {
            targetUrl = targetLocale === "en" ? "/en/not-found" : "/not-found"
        }

        // ==========================================================
        // 🔹 4. Calculators (учёт подстраниц)
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?calculators/.test(path)) {
            const subPath = path.replace(/^\/(en\/)?calculators/, "")
            targetUrl =
                targetLocale === "en"
                    ? `/en/calculators${subPath}`
                    : `/calculators${subPath}`
        }

        // ==========================================================
        // 🔹 5. Tags
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?tags\//.test(path)) {
            const tagMap: Record<string, string> = {
                trends: "novinki",
                novinki: "trends",
                diy: "diy",
                kitchen: "kitchen",
                bathroom: "bathroom",
                walls: "walls",
                interior: "interior",
                design: "design",
                materials: "materials",
                budget: "budget",
                ideas: "ideas",
                renovation: "renovation",
                furniture: "furniture",
                color: "color",
                eco: "eco",
                smart: "smart",
                smart_home: "smart-home",
                lighting: "lighting",
                luxury: "luxury",
                modern: "modern",
                rustic: "rustic",
                minimalism: "minimalism",
                scandinavian: "scandinavian",
                loft: "loft",
                vintage: "vintage",
                sustainability: "sustainability",
                // Русские теги
                кухня: "kitchen",
                ванная: "bathroom",
                стены: "walls",
            }

            const tag = path.split("/").pop() ?? ""
            // Для русских тегов используем урл-кодирование
            const encodedTag = encodeURIComponent(tag)
            const mappedTag = tagMap[tag] || tag

            targetUrl =
                targetLocale === "en"
                    ? `/en/tags/${mappedTag === tag ? encodedTag : mappedTag}`
                    : `/tags/${mappedTag === tag ? encodedTag : mappedTag}`
        }

        // ==========================================================
        // 🔹 6. Categories
        // ==========================================================
        if (!targetUrl && /^\/(en\/)?category\//.test(path)) {
            const categoryMap: Record<string, string> = {
                novinki: "trends",
                trends: "novinki",
                diy: "diy",
                kitchen: "kitchen",
                bathroom: "bathroom",
                walls: "walls",
                eco: "eco",
                design: "design",
                interior: "interior",
                furniture: "furniture",
                lighting: "lighting",
                color: "color",
                renovation: "renovation",
                ideas: "ideas",
                materials: "materials",
                budget: "budget",
                // Русские категории
                кухня: "kitchen",
                ванная: "bathroom",
                стены: "walls",
            }

            const cat = path.split("/").pop() ?? ""
            const encodedCat = encodeURIComponent(cat)
            const mappedCat = categoryMap[cat] || cat

            targetUrl =
                targetLocale === "en"
                    ? `/en/category/${mappedCat === cat ? encodedCat : mappedCat}`
                    : `/category/${mappedCat === cat ? encodedCat : mappedCat}`
        }

        // ==========================================================
        // 🔹 7. Fallback — просто меняем язык
        // ==========================================================
        if (!targetUrl) {
            targetUrl = isEnglish
                ? path.replace(/^\/en/, "") || "/"
                : `/en${path === "/" ? "" : path}`
        }

        // ==========================================================
        // 🔹 8. Финальный ответ
        // ==========================================================
        return NextResponse.json({
            success: true,
            targets: {
                ru: isEnglish
                    ? targetUrl || path.replace(/^\/en/, "") || "/"
                    : path,
                en: !isEnglish
                    ? targetUrl || `/en${path === "/" ? "" : path}`
                    : path,
            },
        })
    } catch (e) {
        console.error("❌ Language switch error:", e)
        return NextResponse.json({
            success: false,
            targets: { ru: "/", en: "/en" },
        })
    }
}
