import { allPosts } from "contentlayer/generated"
import type { Metadata } from "next"
import { TopicHubPage } from "@/components/pages/topic-hub-page"
import { getBudgetPlanningHubDictionary, getBudgetPlanningHubPosts } from "@/lib/budget-planning-hub"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getBudgetPlanningHubDictionary("ru")

export const metadata: Metadata = getPageMetadata(dictionary.path, {
    title: dictionary.title,
    description: dictionary.description,
    cover: "/images/remont-kvartiry-plan-2026/cover.jpg",
    type: "website",
    keywords: dictionary.keywords,
    openGraph: {
        locale: "ru_RU",
    },
})

export const revalidate = 86400
export const dynamic = "force-static"

export default function BudgetPlanningHubPageRu() {
    const posts = getBudgetPlanningHubPosts(allPosts, "ru")

    return <TopicHubPage dictionary={dictionary} posts={posts} />
}
