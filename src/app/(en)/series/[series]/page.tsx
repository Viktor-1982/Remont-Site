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

type PageProps = {
    params: Promise<{ series: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { series } = await params
    if (!isArticleSeriesKey(series)) {
        return {}
    }

    const meta = getArticleSeriesMeta(series, "en")
    if (!meta) {
        return {}
    }

    return getPageMetadata(meta.path, {
        title: `${meta.title} | Renohacks`,
        description: meta.description,
        type: "website",
        openGraph: {
            locale: "en_US",
        },
    })
}

export default async function SeriesEntryPageEn({ params }: PageProps) {
    const { series } = await params
    if (!isArticleSeriesKey(series)) {
        notFound()
    }

    const meta = getArticleSeriesMeta(series, "en")
    const allEnPosts = sortPosts(allPosts).filter((post) => post.locale === "en" && !post.draft)
    const posts = getArticleSeriesPosts(allEnPosts, "en", series)

    if (!meta || posts.length === 0) {
        notFound()
    }

    return <ArticleSeriesPage meta={meta} posts={posts} allPosts={allEnPosts} isEnglish />
}
