import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getKitchenHubDictionary, getKitchenHubPosts } from "@/lib/kitchen-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getKitchenHubDictionary("en")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/kitchen-2026/cover-2026.jpg",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "en_US",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function KitchenHubPageEn() {
    const posts = getKitchenHubPosts(allPosts, "en")

    return <TopicHubPage dictionary={dictionary} posts={posts} isEnglish />
}
