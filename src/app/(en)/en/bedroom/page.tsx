import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getBedroomHubDictionary, getBedroomHubPosts } from "@/lib/bedroom-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getBedroomHubDictionary("en")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: "Bedroom design and renovation ideas: lighting, color, and comfort | Renohacks",
    description: dictionary.description,
    cover: "/images/posts/bedroom-trends-2026/cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "en_US",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function BedroomHubPageEn() {
    const posts = getBedroomHubPosts(allPosts, "en")

    return <TopicHubPage dictionary={dictionary} posts={posts} isEnglish />
}
