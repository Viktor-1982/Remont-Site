"use client"

import { useState } from "react"
import type { Post } from ".contentlayer/generated"
import { ArticleCard } from "@/components/article-card"
import { ArticleRubricBadge } from "@/components/article-rubric-badge"
import { ArticleFilters } from "@/components/article-filters"
import Link from "next/link"
import Image from "next/image"

export function ArticleGrid({ posts, isEnglish = false }: { posts: Post[]; isEnglish?: boolean }) {
    const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)
    if (!posts || posts.length === 0) {
        return (
            <p className="text-center text-muted-foreground py-10">
                ❌ Нет статей
            </p>
        )
    }

    const [latestPost, ...otherPosts] = filteredPosts

    // 🧠 Определяем, новая ли статья
    const isNewPost = (date?: string) => {
        if (!date) return false
        const published = new Date(date)
        const diffDays =
            (Date.now() - published.getTime()) / (1000 * 60 * 60 * 24)
        return diffDays < 7 // моложе 7 дней = новая
    }

    return (
        <section className="space-y-10">
            {/* Фильтры и сортировка */}
            <ArticleFilters
                posts={posts}
                onFilteredPostsChange={setFilteredPosts}
                isEnglish={isEnglish}
            />
            {/* 🔹 Featured пост — только на больших экранах */}
            {latestPost && (
                <div className="hidden md:block relative">
                    <Link
                        href={latestPost.url}
                        className="group block rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 ease-out hover:scale-[1.01] border border-border/20 hover:border-primary/30 will-change-transform"
                        prefetch={true}
                    >
                        <div className="relative aspect-[21/8]">
                            {latestPost.cover && (
                                <Image
                                    src={latestPost.cover}
                                    alt={latestPost.description || latestPost.title}
                                    fill
                                    priority
                                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300 ease-out will-change-transform"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                                />
                            )}

                            {/* 🆕 Если статья свежая — бейдж "Новое / New" */}
                            {isNewPost(latestPost.date) && (
                                <span className="absolute top-6 left-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                  {latestPost.locale === "en" ? "New" : "Новое"}
                </span>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-8 sm:p-12">
                                <div className="text-white max-w-3xl">
                                    <ArticleRubricBadge
                                        rubric={latestPost.rubric}
                                        isEnglish={latestPost.locale === "en"}
                                        className="mb-4 border-white/20 bg-white/10 text-white backdrop-blur-md"
                                    />
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight tracking-tight [text-shadow:_0_2px_20px_rgba(0,0,0,0.5)]">
                                        {latestPost.title}
                                    </h2>
                                    {latestPost.description && (
                                        <p className="text-lg opacity-95 line-clamp-2 font-medium [text-shadow:_0_2px_10px_rgba(0,0,0,0.4)]">
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
