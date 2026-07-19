import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getBathroomHubDictionary, getBathroomHubPosts } from "@/lib/bathroom-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getBathroomHubDictionary("ru")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/posts/bathroom-trends-2026/cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "ru_RU",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function BathroomHubPageRu() {
    const posts = getBathroomHubPosts(allPosts, "ru")

    return <TopicHubPage dictionary={dictionary} posts={posts} />
}
