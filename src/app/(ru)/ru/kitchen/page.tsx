import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getKitchenHubDictionary, getKitchenHubPosts } from "@/lib/kitchen-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getKitchenHubDictionary("ru")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/kitchen-2026/cover-2026.jpg",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "ru_RU",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function KitchenHubPageRu() {
    const posts = getKitchenHubPosts(allPosts, "ru")

    return <TopicHubPage dictionary={dictionary} posts={posts} />
}
