"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"
import { TagList } from "@/components/tag-list"
import type { Post } from ".contentlayer/generated"
import navData from "@/messages/nav.json"

export function ArticleHero({
                                post,
                                clickableTags = false,
                            }: {
    post: Post
    clickableTags?: boolean
}) {
    // 🔹 определяем язык по URL (исправлено)
    const isEnglish =
        post.url.startsWith("/en/") || post.url.endsWith("-en")
    const locale = isEnglish ? "en" : "ru"
    const t = (navData as any)[locale].articles

    // 🔹 форматирование даты
    const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString(
            isEnglish ? "en-US" : "ru-RU",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        )
        : null

    return (
        <section className="flex flex-col gap-6">
            {/* 🖼️ Обложка */}
            {post.cover && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <Image
                        src={post.cover}
                        alt={post.description || post.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    />
                </div>
            )}

            {/* 📝 Заголовок + дата */}
            <header className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>

                {formattedDate && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <time dateTime={post.date}>{formattedDate}</time>
                        {post.readingTime && (
                            <>
                                <span>·</span>
                                <span>
                  {post.readingTime.minutes} {t.minRead} (
                                    {post.readingTime.words} {t.words})
                </span>
                            </>
                        )}
                    </div>
                )}
            </header>

            {/* 📖 Описание */}
            {post.description && (
                <p className="text-lg text-muted-foreground">{post.description}</p>
            )}

            {/* 🏷️ Теги */}
            {post.tags && post.tags.length > 0 && (
                <nav aria-label={t.tagLabel}>
                    <TagList
                        tags={post.tags}
                        isEnglish={isEnglish}
                        clickable={clickableTags}
                    />
                </nav>
            )}
        </section>
    )
}
