import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getPageMetadata } from "@/lib/seo"
import { getSmallApartmentHubDictionary, getSmallApartmentHubPosts } from "@/lib/small-apartment-hub"

const dictionary = getSmallApartmentHubDictionary("ru")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/posts/small-apartment-trends-2026/cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "ru_RU",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function SmallApartmentHubPageRu() {
    const posts = getSmallApartmentHubPosts(allPosts, "ru")

    return <TopicHubPage dictionary={dictionary} posts={posts} />
}
