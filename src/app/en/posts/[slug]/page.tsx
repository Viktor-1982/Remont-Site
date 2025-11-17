import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { ArticleHero } from "@/components/article-hero"
import { TableOfContents } from "@/components/table-of-contents"
import { Mdx } from "@/components/mdx-components"
import { RelatedPosts } from "@/components/related-posts"
import { getPostMetadata } from "@/lib/seo-post" // ✅ единый SEO-модуль
import { parseFAQ } from "@/lib/parse-faq"
import Script from "next/script"

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "en")
    if (!post) return {}
    return getPostMetadata(post) // ✅ единая SEO-логика
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = allPosts.find((p) => p.slug === slug && p.locale === "en")
    if (!post) return notFound()

    const baseUrl = "https://renohacks.com"
    const canonical = `${baseUrl}/en/posts/${slug}`
    
    // Parse FAQ from content
    const faqs = parseFAQ(post.body.raw || "")
    
    // BreadcrumbList schema.org
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${baseUrl}/en`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Articles",
                "item": `${baseUrl}/en/posts`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": canonical
            }
        ]
    }
    
    // FAQPage schema.org (if FAQ exists)
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

    return (
        <article className="container py-12">
            <ArticleHero post={post} />

            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <Mdx code={post.body.code} />
                <TableOfContents items={post.headings} />
            </div>

            <RelatedPosts currentSlug={slug} locale="en" />

            {/* 🟡 JSON-LD structured data for search engines */}
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
                            url: `${baseUrl}/en`,
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
                        inLanguage: "en",
                        articleSection: "Home Renovation & Design",
                        wordCount: post.body.raw?.split(/\s+/).length ?? 0,
                        isAccessibleForFree: true,
                        genre: "DIY, Home Renovation, Interior Design",
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
