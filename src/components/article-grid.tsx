"use client"

import type { Post } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"
import Link from "next/link"
import Image from "next/image"

export function ArticleGrid({ posts }: { posts: Post[] }) {
    if (!posts || posts.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-10">
                ❌ Нет статей
            </p>
        )
    }

    const [latestPost, ...otherPosts] = posts

    // 🧠 Определяем, новая ли статья
    const isNewPost = (date?: string) => {
        if (!date) return false
        const published = new Date(date)
        const diffDays =
            (Date.now() - published.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays < 7 // моложе 7 дней = новая
    }

    return (
        <section className="space-y-10 px-4 sm:px-6 lg:px-8">
            {/* 🔹 Featured пост — только на больших экранах */}
            {latestPost && (
                <div className="hidden md:block relative">
                    <Link
                        href={latestPost.url}
                        className="group block rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.01]"
                    >
                        <div className="relative aspect-[16/6] sm:aspect-[21/7]">
                            {latestPost.cover && (
                                <Image
                                    src={latestPost.cover}
                                    alt={latestPost.description || latestPost.title}
                                    fill
                                    priority
                                    className="object-cover group-hover:brightness-[0.9] transition duration-500"
                                />
                            )}

                            {/* 🆕 Если статья свежая — бейдж "Новое / New" */}
                            {isNewPost(latestPost.date) && (
                                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                  {latestPost.locale === "en" ? "New" : "Новое"}
                </span>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 sm:p-10">
                                <div className="text-white max-w-2xl">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                        {latestPost.title}
                                    </h2>
                                    {latestPost.description && (
                                        <p className="opacity-90 line-clamp-2">
                                            {latestPost.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* 🔹 Сетка остальных + первый пост на мобилке */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                {/* На мобилке показываем latestPost тоже */}
                {latestPost && (
                    <div className="block md:hidden relative">
                        {isNewPost(latestPost.date) && (
                            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10 shadow">
                {latestPost.locale === "en" ? "New" : "Новое"}
              </span>
                        )}
                        <ArticleCard post={latestPost} />
                    </div>
                )}

                {otherPosts.map((post) => (
                    <ArticleCard key={post._id} post={post} />
                ))}
            </div>
        </section>
    )
}
