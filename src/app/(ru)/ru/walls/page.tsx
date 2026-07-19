import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getPageMetadata } from "@/lib/seo"
import { getWallsHubDictionary, getWallsHubPosts } from "@/lib/walls-hub"

const dictionary = getWallsHubDictionary("ru")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/pokraska/paint_cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "ru_RU",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function WallsHubPageRu() {
    const posts = getWallsHubPosts(allPosts, "ru")

    return <TopicHubPage dictionary={dictionary} posts={posts} />
}
