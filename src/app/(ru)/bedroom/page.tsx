import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getBedroomHubDictionary, getBedroomHubPosts } from "@/lib/bedroom-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getBedroomHubDictionary("ru")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: "Спальня: идеи ремонта, свет, цвет и комфорт | Renohacks",
    description: dictionary.description,
    cover: "/images/posts/bedroom-trends-2026/cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "ru_RU",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function BedroomHubPageRu() {
    const posts = getBedroomHubPosts(allPosts, "ru")

    return <TopicHubPage dictionary={dictionary} posts={posts} />
}
