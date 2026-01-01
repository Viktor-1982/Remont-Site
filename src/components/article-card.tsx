"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from ".contentlayer/generated"
import { TagList } from "@/components/tag-list"
import { BookmarkButton } from "@/components/bookmark-button"
import navDataJson from "@/components/messages/nav.json"

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
        <article aria-labelledby={`post-${post._id}`} className="relative">
            {/* Кнопка закладки - абсолютное позиционирование */}
            <div className="absolute top-3 right-3 z-10">
                <BookmarkButton post={post} variant="compact" />
            </div>
            
            <Link href={post.url} className="block h-full" prefetch={true}>
                <Card className="group relative flex flex-col h-full overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-2 border border-border/60 dark:border-border/30 bg-card/80 dark:bg-card/90 backdrop-blur-sm shadow-soft hover:shadow-lg cursor-pointer rounded-xl will-change-transform">
                    {/* Современный градиентный акцент */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-accent/60 to-primary/80 dark:from-primary/60 dark:via-accent/50 dark:to-primary/60 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Легкий glassmorphism эффект при наведении */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:via-transparent dark:to-accent/10 group-hover:from-primary/15 group-hover:via-primary/8 group-hover:to-accent/15 dark:group-hover:from-primary/20 dark:group-hover:via-primary/12 dark:group-hover:to-accent/20 transition-opacity duration-300 rounded-xl pointer-events-none" />
                    
                {post.cover ? (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted">
                        <Image
                            src={post.cover}
                            alt={post.description || post.title}
                            fill
                                className="object-cover inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.03] will-change-transform"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            loading="lazy"
                            fetchPriority="low"
                        />
                            {/* Современный градиентный оверлей */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
                            {/* Декоративный блик */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/10 group-hover:from-white/5 group-hover:via-white/0 group-hover:to-white/15 transition-all duration-700 pointer-events-none" />
                    </div>
                ) : (
                        <div className="aspect-[16/9] bg-gradient-to-br from-muted via-muted/80 to-muted/60 rounded-t-xl" />
                )}

                    <CardContent className="relative flex flex-col flex-1 space-y-3 p-5 sm:p-6 bg-transparent">
                    {/* 📅 дата + время чтения */}
                    <div className="text-xs text-muted-foreground/80 font-medium">
                        {formattedDate && <time dateTime={post.date}>{formattedDate}</time>}
                        {post.readingTime && (
                            <>
                                {" · "}
                                {locale === "en"
                                    ? `${post.readingTime.replace("мин", "min read")}`
                                    : `${post.readingTime} чтения`}
                            </>
                        )}
                    </div>

                    <h3 id={`post-${post._id}`} className="text-lg sm:text-xl font-bold leading-tight tracking-tight">
                            <span className="transition-colors duration-200 text-foreground group-hover:text-primary dark:group-hover:text-primary">
                            {post.title}
                            </span>
                    </h3>

                    {post.description && (
                            <p className="text-sm text-muted-foreground/90 line-clamp-2 flex-1 leading-relaxed">
                            {post.description}
                        </p>
                    )}

                    {post.tags?.length ? (
                        <nav aria-label={t.tagLabel} className="mt-auto pt-1">
                            <TagList tags={post.tags.slice(0, 4)} isEnglish={isEnglish} />
                        </nav>
                    ) : null}
                </CardContent>
            </Card>
            </Link>
        </article>
    )
}
