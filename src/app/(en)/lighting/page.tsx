import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getLightingHubDictionary, getLightingHubPosts } from "@/lib/lighting-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getLightingHubDictionary("en")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: "Lighting for Home Renovation: Ideas, Standards, and Tools | Renohacks",
    description: dictionary.description,
    cover: "/images/posts/lighting-trends-2026/photos/01-cover.jpg",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "en_US",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function LightingHubPageEn() {
    const posts = getLightingHubPosts(allPosts, "en")

    return <TopicHubPage dictionary={dictionary} posts={posts} isEnglish />
}
