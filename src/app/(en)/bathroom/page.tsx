import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getBathroomHubDictionary, getBathroomHubPosts } from "@/lib/bathroom-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getBathroomHubDictionary("en")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/posts/bathroom-trends-2026/cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "en_US",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function BathroomHubPageEn() {
    const posts = getBathroomHubPosts(allPosts, "en")

    return <TopicHubPage dictionary={dictionary} posts={posts} isEnglish />
}
