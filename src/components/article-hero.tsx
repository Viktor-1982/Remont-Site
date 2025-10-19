"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"
import { TagList } from "@/components/tag-list"
import type { Post } from ".contentlayer/generated"
import navDataJson from "@/messages/nav.json"

type Locale = "ru" | "en"
interface ArticlesDict {
    minRead: string
    tagLabel: string
    words?: string
}
type NavData = Record<Locale, { articles: ArticlesDict }>
const navData: NavData = navDataJson as NavData

export function ArticleHero({ post }: { post: Post }) {
    const isEnglish = post.locale === "en"
    const locale: Locale = isEnglish ? "en" : "ru"
    const t = navData[locale].articles

    const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString(isEnglish ? "en-US" : "ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : null

    return (
        <section className="flex flex-col gap-6">
            {post.cover && (
                <div className="relative aspect-[16/9] w-full max-h-[360px] overflow-hidden rounded-lg mx-auto">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <header className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
                <p className="text-muted-foreground">{post.description}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {formattedDate && (
                        <>
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>{formattedDate}</time>
                        </>
                    )}
                    {post.readingTime && (
                        <>
                            <span>·</span>
                            <span>
                {locale === "en"
                    ? post.readingTime.replace("мин", "min read")
                    : `${post.readingTime} чтения`}
              </span>
                        </>
                    )}
                </div>
            </header>

            {post.tags && <TagList tags={post.tags} isEnglish={isEnglish} />}
        </section>
    )
}
