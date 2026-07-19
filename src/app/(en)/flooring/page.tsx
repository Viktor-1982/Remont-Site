import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getFlooringHubDictionary, getFlooringHubPosts } from "@/lib/flooring-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getFlooringHubDictionary("en")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/posts/flooring-calculation-guide/cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "en_US",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function FlooringHubPageEn() {
    const posts = getFlooringHubPosts(allPosts, "en")

    return <TopicHubPage dictionary={dictionary} posts={posts} isEnglish />
}
