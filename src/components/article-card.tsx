"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from ".contentlayer/generated"
import { TagList } from "@/components/tag-list"
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
        <article aria-labelledby={`post-${post._id}`}>
            <Link href={post.url} className="block h-full">
                <Card className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 border-border/90 dark:border-border/40 bg-gradient-to-br from-white via-card to-primary/8 dark:from-card dark:via-card dark:to-transparent shadow-xl dark:shadow-lg ring-2 ring-primary/10 dark:ring-border/20 cursor-pointer">
                    {/* Декоративный градиентный акцент (всегда видимый в светлой теме) */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/60 via-accent/50 to-primary/60 dark:from-primary/40 dark:via-accent/40 dark:to-primary/40 opacity-60 group-hover:opacity-100 transition-opacity duration-300 shadow-sm" />
                    
                    {/* Светящийся эффект (более заметный в светлой теме) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-primary/2 to-accent/3 dark:from-primary/0 dark:via-primary/0 dark:to-accent/0 group-hover:from-primary/12 group-hover:via-primary/8 group-hover:to-accent/12 dark:group-hover:from-primary/5 dark:group-hover:via-primary/3 dark:group-hover:to-accent/5 transition-all duration-300 rounded-lg pointer-events-none" />
                    
                {post.cover ? (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-muted border-b border-border/40">
                        <Image
                            src={post.cover}
                            alt={post.description || post.title}
                            fill
                                className="object-cover inset-0 transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                            {/* Легкий оверлей при наведении */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>
                ) : (
                        <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/60 rounded-t-lg border-b border-border/40" />
                )}

                    <CardContent className="relative flex flex-col flex-1 space-y-2 p-4 sm:p-5 bg-white/90 dark:bg-card backdrop-blur-sm">
                    {/* 📅 дата + время чтения */}
                    <div className="text-xs text-muted-foreground">
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

                    <h3 id={`post-${post._id}`} className="text-lg font-semibold leading-snug">
                            <span className="transition-colors text-foreground group-hover:text-primary dark:group-hover:text-primary/90">
                            {post.title}
                            </span>
                    </h3>

                    {post.description && (
                            <p className="text-sm text-muted-foreground dark:text-muted-foreground line-clamp-2 flex-1">
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
