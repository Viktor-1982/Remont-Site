"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Post } from ".contentlayer/generated"
import { cn } from "@/lib/utils"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface PostNavigationDict {
    previous: string
    next: string
}

type NavData = Record<Locale, { postNavigation: PostNavigationDict }>

const navData: NavData = navDataJson as NavData

interface PostNavigationProps {
    currentSlug: string
    locale: "ru" | "en"
}

export function PostNavigation({ currentSlug, locale }: PostNavigationProps) {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    // Загружаем посты через API
    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setPosts(data)
                }
            })
            .catch(() => {
                // Игнорируем ошибки
            })
            .finally(() => setLoading(false))
    }, [])

    // Получаем все статьи того же языка, отсортированные по дате (новые первыми)
    const sortedPosts = posts
        .filter((post) => post.locale === locale && !post.draft)
        .sort((a, b) => {
            const ta = a.date ? new Date(a.date).getTime() : 0
            const tb = b.date ? new Date(b.date).getTime() : 0
            return tb - ta // Новые первыми
        })

    // Находим индекс текущей статьи
    const currentIndex = sortedPosts.findIndex((post) => post.slug === currentSlug)

    if (loading || currentIndex === -1) return null

    // Предыдущая статья (более новая, индекс меньше)
    const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null

    // Следующая статья (более старая, индекс больше)
    const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

    // Если нет ни предыдущей, ни следующей статьи, не показываем навигацию
    if (!previousPost && !nextPost) return null

    const t = navData[locale].postNavigation
    const basePath = locale === "en" ? "/en" : ""

    return (
        <nav
            className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-border/50 dark:border-border/40"
            aria-label={locale === "en" ? "Article navigation" : "Навигация по статьям"}
        >
            <div className={cn(
                "grid gap-4 sm:gap-6",
                previousPost && nextPost ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
            )}>
                {/* Предыдущая статья (более новая) */}
                {previousPost && (
                    <Link
                        href={`${basePath}/posts/${previousPost.slug}`}
                        className={cn(
                            "group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl border-2 border-border/60 dark:border-border/40",
                            "bg-card/60 dark:bg-card/70 hover:bg-card dark:hover:bg-card/90",
                            "hover:border-primary/60 dark:hover:border-primary/50",
                            "hover:shadow-lg hover:shadow-primary/10 transition-all duration-300",
                            "text-left"
                        )}
                        prefetch={true}
                    >
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 dark:bg-primary/25 flex items-center justify-center group-hover:bg-primary/25 dark:group-hover:bg-primary/35 transition-colors border border-primary/20">
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm text-primary/80 mb-1 font-semibold uppercase tracking-wide">
                                {t.previous}
                            </div>
                            <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {previousPost.title}
                            </div>
                        </div>
                    </Link>
                )}

                {/* Следующая статья (более старая) */}
                {nextPost && (
                    <Link
                        href={`${basePath}/posts/${nextPost.slug}`}
                        className={cn(
                            "group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl border-2 border-border/60 dark:border-border/40",
                            "bg-card/60 dark:bg-card/70 hover:bg-card dark:hover:bg-card/90",
                            "hover:border-primary/60 dark:hover:border-primary/50",
                            "hover:shadow-lg hover:shadow-primary/10 transition-all duration-300",
                            previousPost ? "text-left" : "text-left sm:ml-auto sm:max-w-md",
                            !previousPost && "sm:justify-end"
                        )}
                        prefetch={true}
                    >
                        {previousPost ? (
                            <>
                                <div className="flex-1 min-w-0 order-2 sm:order-1">
                                    <div className="text-xs sm:text-sm text-primary/80 mb-1 font-semibold uppercase tracking-wide">
                                        {t.next}
                                    </div>
                                    <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {nextPost.title}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 dark:bg-primary/25 flex items-center justify-center group-hover:bg-primary/25 dark:group-hover:bg-primary/35 transition-colors order-1 sm:order-2 border border-primary/20">
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 dark:bg-primary/25 flex items-center justify-center group-hover:bg-primary/25 dark:group-hover:bg-primary/35 transition-colors border border-primary/20">
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs sm:text-sm text-primary/80 mb-1 font-semibold uppercase tracking-wide">
                                        {t.next}
                                    </div>
                                    <div className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {nextPost.title}
                                    </div>
                                </div>
                            </>
                        )}
                    </Link>
                )}
            </div>
        </nav>
    )
}

