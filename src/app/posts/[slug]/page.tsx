import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { ArticleHero } from "@/components/article-hero"
import { TableOfContents } from "@/components/table-of-contents"
import { Mdx } from "@/components/mdx-components"
import { RelatedPosts } from "@/components/related-posts"
import { ReadingProgress } from "@/components/reading-progress"
import { ReadingPosition } from "@/components/reading-position"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getPostMetadata } from "@/lib/seo-post" // ✅ используем общий SEO-модуль
import { parseFAQ } from "@/lib/parse-faq"
import Script from "next/script"

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "ru")
    if (!post) return {}
    return getPostMetadata(post) // ✅ автоматическое SEO
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "ru")
    if (!post) return notFound()

    const baseUrl = "https://renohacks.com"
    const canonical = `${baseUrl}/posts/${slug}`
    
    // Парсим FAQ из контента
    const faqs = parseFAQ(post.body.raw || "")
    
    // BreadcrumbList schema.org
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Главная",
                "item": `${baseUrl}/`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Статьи",
                "item": `${baseUrl}/posts`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": canonical
            }
        ]
    }
    
    // FAQPage schema.org (если есть FAQ)
    const faqSchema = faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null

    // Извлекаем минуты из readingTime (формат: "5 мин")
    const readingTimeMinutes = post.readingTime 
        ? parseInt(post.readingTime.replace(/\D/g, "")) 
        : undefined

    return (
        <article className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12 max-w-7xl">
            <ReadingProgress readingTimeMinutes={readingTimeMinutes} isEnglish={false} />
            <ReadingPosition slug={slug} locale="ru" />
            <Breadcrumbs 
                isEnglish={false}
                items={[
                    { label: "Главная", href: "/" },
                    { label: "Статьи", href: "/posts" },
                    { label: post.title, href: canonical },
                ]}
            />
            <ArticleHero post={post} />

            <div className="grid gap-6 sm:gap-8 md:gap-12 lg:grid-cols-[1fr_280px] mt-8 sm:mt-10 md:mt-12">
                <div className="min-w-0">
                    <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-soft">
                        <Mdx code={post.body.code} />
                    </div>
                </div>
                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <TableOfContents items={post.headings} />
                    </div>
                </aside>
            </div>

            <div className="mt-10 sm:mt-12 md:mt-16">
                <RelatedPosts currentSlug={slug} locale="ru" />
            </div>

            {/* 🟡 JSON-LD: структурированные данные для поисковиков */}
            <Script
                id="blogposting-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        description: post.description,
                        image: [`${baseUrl}${post.cover || "/images/og-default.png"}`],
                        author: {
                            "@type": "Organization",
                            name: "Renohacks",
                            url: baseUrl,
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Renohacks",
                            logo: {
                                "@type": "ImageObject",
                                url: `${baseUrl}/favicon.ico`,
                            },
                        },
                        datePublished: post.date,
                        dateModified: post.date,
                        mainEntityOfPage: {
                            "@type": "WebPage",
                            "@id": canonical,
                        },
                        keywords: post.keywords?.join(", "),
                        inLanguage: "ru",
                        articleSection: "Ремонт и дизайн",
                        wordCount: post.body.raw?.split(/\s+/).length ?? 0,
                        isAccessibleForFree: true,
                        genre: "DIY, Ремонт, Дизайн интерьера",
                    }),
                }}
            />
            
            {/* BreadcrumbList schema.org */}
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            
            {/* FAQPage schema.org */}
            {faqSchema && (
                <Script
                    id="faq-schema"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}
        </article>
    )
}
