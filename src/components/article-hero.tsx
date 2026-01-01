"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"
import { TagList } from "@/components/tag-list"
import { ShareButton } from "@/components/share-button"
import { BookmarkButton } from "@/components/bookmark-button"
import type { Post } from ".contentlayer/generated"

type Locale = "ru" | "en"

export function ArticleHero({ post }: { post: Post }) {
    const isEnglish = post.locale === "en"
    const locale: Locale = isEnglish ? "en" : "ru"

    const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString(isEnglish ? "en-US" : "ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : null

    return (
        <section className="flex flex-col gap-6 sm:gap-8">
            {post.cover && (
                <div className="relative aspect-[21/9] w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] overflow-hidden rounded-xl sm:rounded-2xl mx-auto shadow-2xl border border-border/20 group">
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    {/* Градиентный оверлей для лучшей читаемости */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    
                    {/* Кнопки действий - появляются при наведении на десктопе */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hidden md:flex gap-2">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                            <BookmarkButton post={post} variant="compact" />
                        </div>
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                            <ShareButton
                                url={post.url}
                                title={post.title}
                                description={post.description}
                                isEnglish={isEnglish}
                                variant="compact"
                            />
                        </div>
                    </div>
                    
                    {/* Кнопки действий для мобильных - всегда видимы */}
                    <div className="absolute top-4 right-4 md:hidden z-10 flex gap-2">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                            <BookmarkButton post={post} variant="compact" />
                        </div>
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                            <ShareButton
                                url={post.url}
                                title={post.title}
                                description={post.description}
                                isEnglish={isEnglish}
                                variant="compact"
                            />
                        </div>
                    </div>
                </div>
            )}

            <header className="space-y-4 max-w-4xl mx-auto w-full">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text">
                            {post.title}
                        </h1>
                    </div>
                    {/* Кнопка закладки рядом с заголовком - видна всегда на десктопе */}
                    <div className="hidden md:block mt-2 flex-shrink-0">
                        <BookmarkButton post={post} variant="default" />
                    </div>
                </div>
                {post.description && (
                    <p className="text-lg sm:text-xl text-muted-foreground/90 leading-relaxed font-medium">
                        {post.description}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/90 pt-2">
                    {formattedDate && (
                        <div className="flex items-center gap-2 text-foreground/70">
                            <Calendar className="h-4 w-4 text-primary/70" />
                            <time dateTime={post.date}>{formattedDate}</time>
                        </div>
                    )}
                    {post.readingTime && (
                        <>
                            <span className="text-muted-foreground/40">·</span>
                            <span className="text-foreground/70">
                {locale === "en"
                    ? post.readingTime.replace("мин", "min read")
                    : `${post.readingTime} чтения`}
              </span>
                        </>
                    )}
                </div>
            </header>

            {post.tags && (
                <div className="max-w-4xl mx-auto w-full">
                    <TagList tags={post.tags} isEnglish={isEnglish} />
                </div>
            )}
        </section>
    )
}
