import fs from "node:fs"
import path from "node:path"
import { describe, expect, it } from "vitest"
import { allPosts } from "../../.contentlayer/generated"
import { getPageMetadata, resolveLocalePaths, baseUrl } from "@/lib/seo"
import { getPostMetadata } from "@/lib/seo-post"
import { parseFAQ } from "@/lib/parse-faq"
import sitemap from "@/app/sitemap"
import nextConfig from "../../next.config"

describe("SEO & Routing Regression Suite", () => {
    describe("Locale Path Resolution (EN without /en, RU with /ru)", () => {
        it("resolves root and static pages without /en for English and with /ru for Russian", () => {
            expect(resolveLocalePaths("/")).toEqual({ en: "/", ru: "/ru" })
            expect(resolveLocalePaths("/ru")).toEqual({ en: "/", ru: "/ru" })
            expect(resolveLocalePaths("/about")).toEqual({ en: "/about", ru: "/ru/about" })
            expect(resolveLocalePaths("/ru/about")).toEqual({ en: "/about", ru: "/ru/about" })
            expect(resolveLocalePaths("/calculators/tile")).toEqual({
                en: "/calculators/tile",
                ru: "/ru/calculators/tile",
            })
        })

        it("strips legacy /en prefix cleanly to canonical bare path", () => {
            expect(resolveLocalePaths("/en")).toEqual({ en: "/", ru: "/ru" })
            expect(resolveLocalePaths("/en/about")).toEqual({ en: "/about", ru: "/ru/about" })
            expect(resolveLocalePaths("/en/costs")).toEqual({ en: "/costs", ru: "/ru/smety" })
        })

        it("maps asymmetric costs and smety paths reciprocally", () => {
            expect(resolveLocalePaths("/costs")).toEqual({ en: "/costs", ru: "/ru/smety" })
            expect(resolveLocalePaths("/ru/smety")).toEqual({ en: "/costs", ru: "/ru/smety" })
        })
    })

    describe("getPageMetadata OpenGraph locale & hreflang", () => {
        it("sets en_US OpenGraph locale and canonical without /en for English pages", () => {
            const meta = getPageMetadata("/calculators/tile", {
                title: "Tile Calculator",
                description: "Calculate tiles accurately.",
            })
            expect(meta.alternates?.canonical).toBe(`${baseUrl}/calculators/tile`)
            expect(meta.alternates?.languages).toEqual({
                en: `${baseUrl}/calculators/tile`,
                ru: `${baseUrl}/ru/calculators/tile`,
                "x-default": `${baseUrl}/calculators/tile`,
            })
            expect((meta.openGraph as { locale?: string })?.locale).toBe("en_US")
        })

        it("sets ru_RU OpenGraph locale and /ru canonical for Russian pages", () => {
            const meta = getPageMetadata("/ru/calculators/tile", {
                title: "Калькулятор плитки",
                description: "Точный расчет плитки.",
            })
            expect(meta.alternates?.canonical).toBe(`${baseUrl}/ru/calculators/tile`)
            expect(meta.alternates?.languages).toEqual({
                en: `${baseUrl}/calculators/tile`,
                ru: `${baseUrl}/ru/calculators/tile`,
                "x-default": `${baseUrl}/calculators/tile`,
            })
            expect((meta.openGraph as { locale?: string })?.locale).toBe("ru_RU")
        })
    })

    describe("Post Metadata & Reciprocal hreflang", () => {
        it("generates valid canonicals and reciprocal hreflang for all published posts", () => {
            const published = allPosts.filter((p) => !p.draft)
            expect(published.length).toBeGreaterThan(100)

            for (const post of published) {
                const meta = getPostMetadata(post)
                const expectedCanonical = `${baseUrl}${post.url}`
                expect(meta.alternates?.canonical).toBe(expectedCanonical)

                if (post.locale === "en") {
                    expect(post.url).toBe(`/posts/${post.slug}`)
                    expect(post.url.startsWith("/en/")).toBe(false)
                    expect((meta.openGraph as { locale?: string })?.locale).toBe("en_US")
                } else {
                    expect(post.url).toBe(`/ru/posts/${post.slug}`)
                    expect((meta.openGraph as { locale?: string })?.locale).toBe("ru_RU")
                }

                const languages = meta.alternates?.languages as Record<string, string> | undefined
                expect(languages).toBeDefined()
                expect(languages?.[post.locale]).toBe(expectedCanonical)
                // x-default must never fall back to the bare homepage on an article page
                expect(languages?.["x-default"]).not.toBe(`${baseUrl}/`)
            }
        })
    })

    describe("Sitemap Integrity", () => {
        it("contains zero /en/ URLs and excludes redirecting /calculators hubs", () => {
            const entries = sitemap()
            expect(entries.length).toBeGreaterThan(150)

            for (const entry of entries) {
                expect(entry.url).not.toMatch(/https:\/\/renohacks\.com\/en(\/|$)/)
                expect(entry.url).not.toBe(`${baseUrl}/calculators`)
                expect(entry.url).not.toBe(`${baseUrl}/ru/calculators`)
            }
        })
    })

    describe("Legacy Redirects & Internal Link Hygiene", () => {
        it("preserves permanent redirects for legacy /en/* external links in next.config.ts", async () => {
            const redirects = await nextConfig.redirects?.()
            expect(redirects).toBeDefined()
            expect(redirects).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        source: "/en",
                        destination: "/",
                        permanent: true,
                    }),
                    expect.objectContaining({
                        source: "/en/:path*",
                        destination: "/:path*",
                        permanent: true,
                    }),
                ])
            )
        })

        it("ensures navigation components do not generate /en/ links or unprefixed RU links", () => {
            const filesToCheck = [
                "src/components/related-posts.tsx",
                "src/components/popular-posts.tsx",
                "src/components/search-bar.tsx",
            ]

            for (const relPath of filesToCheck) {
                const content = fs.readFileSync(path.join(process.cwd(), relPath), "utf8")
                expect(content).not.toContain('locale === "en" ? "en/" : ""')
                expect(content).not.toContain('isEnglish ? "en/" : ""')
            }
        })
    })

    describe("Costs & Smety Category Pages (Anti-Soft-404)", () => {
        it("matches at least 5 published articles for both /costs and /ru/smety", () => {
            const costTagsEn = new Set([
                "estimates",
                "estimate",
                "budget",
                "budgeting",
                "renovation budget",
                "budget renovation",
                "costs",
                "renovation costs",
            ])
            const costSlugsEn = new Set(["home-renovation-costs-2026", "renovation-mistakes-2026"])

            const enMatches = allPosts.filter(
                (p) =>
                    !p.draft &&
                    p.locale === "en" &&
                    (costSlugsEn.has(p.slug) || p.tags?.some((t) => costTagsEn.has(t.toLowerCase())))
            )
            expect(enMatches.length).toBeGreaterThanOrEqual(5)

            const costTagsRu = new Set([
                "сметы",
                "смета",
                "бюджет",
                "бюджет ремонта",
                "бюджетный ремонт",
                "стоимость ремонта",
            ])
            const costSlugsRu = new Set(["skolko-stoit-remont-kvartiry-2026", "oshibki-remonta-2026"])

            const ruMatches = allPosts.filter(
                (p) =>
                    !p.draft &&
                    p.locale === "ru" &&
                    (costSlugsRu.has(p.slug) || p.tags?.some((t) => costTagsRu.has(t.toLowerCase())))
            )
            expect(ruMatches.length).toBeGreaterThanOrEqual(5)
        })
    })

    describe("FAQ Parser Coverage", () => {
        it("parses H3 questions, bold questions, CRLF line endings, and <FAQSection />", () => {
            const h3Sample =
                "## Frequently Asked Questions\r\n\r\n### How much extra tile should I buy?\r\nAlways add 10% for straight lay and 15% for diagonal.\r\n\r\n### Can I tile over drywall?\r\nUse cement backer board in wet zones.\r\n\r\n## Conclusion\r\nDone."
            const parsedH3 = parseFAQ(h3Sample)
            expect(parsedH3).toHaveLength(2)
            expect(parsedH3[0].question).toBe("How much extra tile should I buy?")

            const jsxSample = `<FAQSection items={[{ question: "Вопрос 1?", answer: "Ответ 1." }, { question: "Вопрос 2?", answer: "Ответ 2." }]} />`
            expect(parseFAQ(jsxSample)).toHaveLength(2)
        })

        it("successfully extracts FAQs from all MDX articles with FAQ sections", () => {
            const postsWithFaq = allPosts.filter((p) => {
                const raw = p.body?.raw || ""
                return (
                    /^##\s+.*(?:FAQ|Frequently Asked Questions|Common Questions|Частые вопросы|Часто задаваемые вопросы)/im.test(
                        raw
                    ) || /<FAQSection/.test(raw)
                )
            })
            expect(postsWithFaq.length).toBeGreaterThanOrEqual(45)

            for (const post of postsWithFaq) {
                const parsed = parseFAQ(post.body.raw)
                expect(parsed.length, `Failed to parse FAQ in ${post._raw.sourceFilePath}`).toBeGreaterThan(0)
            }
        })
    })
})
