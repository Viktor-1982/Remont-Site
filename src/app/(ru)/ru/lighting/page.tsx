import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getLightingHubDictionary, getLightingHubPosts } from "@/lib/lighting-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getLightingHubDictionary("ru")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/posts/lighting-trends-2026/photos/01-cover.jpg",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "ru_RU",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function LightingHubPageRu() {
    const posts = getLightingHubPosts(allPosts, "ru")

    return <TopicHubPage dictionary={dictionary} posts={posts} />
}
