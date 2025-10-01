"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from ".contentlayer/generated"
import { TagList } from "@/components/tag-list"
import navData from "@/messages/nav.json"

export function ArticleCard({
                                post,
                                clickableTags = false,
                            }: {
    post: Post
    clickableTags?: boolean
}) {
    const isEnglish =
        post.url.startsWith("/en/") || post.url.endsWith("-en")

    const locale = isEnglish ? "en-US" : "ru-RU"

    const t = (navData as any)[isEnglish ? "en" : "ru"].articles

    const formattedDate = post.date
        ? new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(post.date))
        : null

    return (
        <article
            aria-labelledby={`post-${post._id}`}
            aria-describedby={post.description ? `desc-${post._id}` : undefined}
        >
            <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg group">
                {/* 🖼️ Обложка */}
                {post.cover ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-muted">
                        <Image
                            src={post.cover}
                            alt={post.description || post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>
                ) : (
                    <div className="aspect-[16/9] bg-muted rounded-t-lg" />
                )}

                <CardContent className="flex flex-col flex-1 space-y-2 p-4">
                    {/* 📅 Дата + время чтения */}
                    <div className="text-xs text-muted-foreground">
                        {formattedDate && <time dateTime={post.date}>{formattedDate}</time>}
                        {post.readingTime?.minutes &&
                            ` · ${post.readingTime.minutes} ${t.minRead}`}
                        {post.readingTime?.words &&
                            ` · ${post.readingTime.words} ${t.words}`}
                    </div>

                    {/* 📝 Заголовок */}
                    <h3
                        id={`post-${post._id}`}
                        className="text-lg font-semibold leading-snug"
                    >
                        <Link
                            href={post.url}
                            className="transition-colors hover:text-primary"
                        >
                            {post.title}
                        </Link>
                    </h3>

                    {/* 📖 Описание */}
                    {post.description && (
                        <p
                            id={`desc-${post._id}`}
                            className="text-sm text-muted-foreground line-clamp-2 flex-1"
                        >
                            {post.description}
                        </p>
                    )}

                    {/* 🏷️ Теги */}
                    {post.tags && post.tags.length > 0 && (
                        <nav aria-label={t.tagLabel} className="mt-auto pt-1">
                            <TagList
                                tags={post.tags.slice(0, 4)}
                                isEnglish={isEnglish}
                                clickable={clickableTags}
                            />
                        </nav>
                    )}
                </CardContent>
            </Card>
        </article>
    )
}
