import type { Post } from "contentlayer/generated"

export type TopicHubLocale = "ru" | "en"

export type TopicHubIcon = "lightbulb" | "home" | "calculator" | "grid" | "wrench"

export interface TopicHubFeature {
    icon: TopicHubIcon
    title: string
    description: string
}

export interface TopicHubFaqItem {
    question: string
    answer: string
}

export interface TopicHubRelatedLink {
    icon: TopicHubIcon
    title: string
    description: string
    href: string
}

export interface TopicHubDictionary {
    key: string
    path: string
    title: string
    description: string
    keywords: string[]
    eyebrow: string
    breadcrumbLabel: string
    featureCards: TopicHubFeature[]
    calculator: {
        icon: TopicHubIcon
        eyebrow: string
        title: string
        description: string
        href: string
        buttonLabel: string
    }
    relatedTitle?: string
    relatedLinks?: TopicHubRelatedLink[]
    featuredLabel: string
    featuredIntro: string
    articlesTitle: string
    articlesDescription: string
    faqTitle: string
    faqs: TopicHubFaqItem[]
}

export function getTopicHubPosts(posts: Post[], locale: TopicHubLocale, slugs: string[]): Post[] {
    const bySlug = new Map(
        posts
            .filter((post) => !post.draft && post.locale === locale)
            .map((post) => [post.slug, post] as const)
    )

    return slugs.map((slug) => bySlug.get(slug)).filter((post): post is Post => Boolean(post))
}
