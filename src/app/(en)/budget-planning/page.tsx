import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getBudgetPlanningHubDictionary, getBudgetPlanningHubPosts } from "@/lib/budget-planning-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getBudgetPlanningHubDictionary("en")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/remont-kvartiry-plan-2026/cover.jpg",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "en_US",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function BudgetPlanningHubPageEn() {
    const posts = getBudgetPlanningHubPosts(allPosts, "en")

    return <TopicHubPage dictionary={dictionary} posts={posts} isEnglish />
}
