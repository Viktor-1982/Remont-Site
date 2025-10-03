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

    return (
        <section className="space-y-10 px-4 sm:px-6 lg:px-8">
            {/* 🔹 Featured пост — только на больших экранах */}
            {latestPost && (
                <div className="hidden md:block">
                    <Link
                        href={latestPost.url}
                        className="block rounded-xl overflow-hidden shadow-lg"
                    >
                        <div className="relative aspect-[16/6] sm:aspect-[21/7]">
                            {latestPost.cover && (
                                <Image
                                    src={latestPost.cover}
                                    alt={latestPost.description || latestPost.title}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
                                <div className="text-white max-w-2xl">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* На мобилке показываем latestPost тоже */}
                {latestPost && (
                    <div className="block md:hidden">
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
