import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getPageMetadata } from "@/lib/seo"
import { getWallsHubDictionary, getWallsHubPosts } from "@/lib/walls-hub"

const dictionary = getWallsHubDictionary("en")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: "Walls and finishes: paint, wallpaper, and wall prep without rework | Renohacks",
    description: dictionary.description,
    cover: "/images/pokraska/paint_cover.png",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "en_US",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function WallsHubPageEn() {
    const posts = getWallsHubPosts(allPosts, "en")

    return <TopicHubPage dictionary={dictionary} posts={posts} isEnglish />
}
