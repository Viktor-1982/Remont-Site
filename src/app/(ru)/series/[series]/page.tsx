import type { Metadata } from "next"
import { allPosts } from "contentlayer/generated"
import { notFound } from "next/navigation"
import { ArticleSeriesPage } from "@/components/pages/article-series-page"
import {
    getAllArticleSeriesKeys,
    getArticleSeriesMeta,
    getArticleSeriesPosts,
    isArticleSeriesKey,
} from "@/lib/article-series"
import { getPageMetadata } from "@/lib/seo"
import { sortPosts } from "@/lib/utils"

export const revalidate = 86400
export const dynamic = "force-static"

export function generateStaticParams() {
    return getAllArticleSeriesKeys().map((series) => ({ series }))
}

export function generateMetadata({
    params,
}: {
    params: { series: string }
}): Metadata {
    if (!isArticleSeriesKey(params.series)) {
        return {}
    }

    const meta = getArticleSeriesMeta(params.series, "ru")
    if (!meta) {
        return {}
    }

    return getPageMetadata(meta.path, {
        title: `${meta.title} | Renohacks`,
        description: meta.description,
        type: "website",
        openGraph: {
            locale: "ru_RU",
        },
    })
}

export default function SeriesEntryPageRu({
    params,
}: {
    params: { series: string }
}) {
    if (!isArticleSeriesKey(params.series)) {
        notFound()
    }

    const meta = getArticleSeriesMeta(params.series, "ru")
    const allRuPosts = sortPosts(allPosts).filter((post) => post.locale === "ru" && !post.draft)
    const posts = getArticleSeriesPosts(allRuPosts, "ru", params.series)

    if (!meta || posts.length === 0) {
        notFound()
    }

    return <ArticleSeriesPage meta={meta} posts={posts} allPosts={allRuPosts} />
}
