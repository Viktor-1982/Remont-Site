// src/components/article-card.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from ".contentlayer/generated"
import { TagList } from "@/components/tag-list"
import navDataJson from "@/messages/nav.json"

// Типы для nav.json
type Locale = "ru" | "en"

interface ArticlesDict {
    minRead: string
    tagLabel: string
    words?: string
}

type NavData = Record<Locale, { articles: ArticlesDict }>

const navData: NavData = navDataJson as NavData

export function ArticleCard({ post }: { post: Post }) {
    const isEnglish = post.locale === "en"
    const locale: Locale = isEnglish ? "en" : "ru"
    const t = navData[locale].articles

    const formattedDate = post.date
        ? new Intl.DateTimeFormat(isEnglish ? "en-US" : "ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(post.date))
        : null

    return (
        <article aria-labelledby={`post-${post._id}`}>
            <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg group">
                {/* 🖼️ Обложка */}
                {post.cover ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-muted">
                        <Image
                            src={post.cover}
                            alt={post.description || post.title}
                            fill
                            className="object-cover inset-0 transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            priority={false}
                        />
                    </div>
                ) : (
                    <div className="aspect-[16/9] bg-muted rounded-t-lg" />
                )}

                {/* 📑 Контент */}
                <CardContent className="flex flex-col flex-1 space-y-2 p-4 sm:p-5">
                    {/* 📅 Дата + время чтения */}
                    <div className="text-xs text-muted-foreground">
                        {formattedDate && <time dateTime={post.date}>{formattedDate}</time>}
                        {post.readingTime && ` · ${post.readingTime} ${t.minRead}`}
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
                        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                            {post.description}
                        </p>
                    )}

                    {/* 🏷️ Теги (только вывод, без кликабельности) */}
                    {post.tags && post.tags.length > 0 && (
                        <nav aria-label={t.tagLabel} className="mt-auto pt-1">
                            <TagList tags={post.tags.slice(0, 4)} isEnglish={isEnglish} />
                        </nav>
                    )}
                </CardContent>
            </Card>
        </article>
    )
}
