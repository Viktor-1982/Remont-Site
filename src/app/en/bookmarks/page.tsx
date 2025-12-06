"use client"

import { useEffect, useState } from "react"
import { useBookmarks, type BookmarkData } from "@/lib/use-bookmarks"
import { ArticleCard } from "@/components/article-card"
import { allPosts, type Post } from ".contentlayer/generated"
import { Bookmark, BookmarkX } from "lucide-react"
import Link from "next/link"
import navDataJson from "@/components/messages/nav.json"

type Locale = "ru" | "en"

interface BookmarksDict {
    title: string
    empty: string
    emptyDescription: string
    clearAll: string
    clearAllConfirm: string
    clearAllCancel: string
}

type NavData = Record<Locale, { bookmarks: BookmarksDict }>

const navData: NavData = navDataJson as NavData

export default function BookmarksPageEn() {
    const { getBookmarksByLocale, removeBookmark, bookmarks } = useBookmarks()
    const [showClearConfirm, setShowClearConfirm] = useState(false)
    const [bookmarkPosts, setBookmarkPosts] = useState<Post[]>([])

    // Загружаем посты для закладок (английские)
    useEffect(() => {
        const bookmarkData = getBookmarksByLocale("en")
        const posts = bookmarkData
            .map((bookmark) => {
                const post = allPosts.find(
                    (p) => p.slug === bookmark.slug && p.locale === bookmark.locale
                )
                return post
            })
            .filter((post): post is Post => post !== undefined)

        setBookmarkPosts(posts)
    }, [bookmarks, getBookmarksByLocale])

    const t = navData.en.bookmarks
    const bookmarkData = getBookmarksByLocale("en")

    const handleClearAll = () => {
        bookmarkData.forEach((bookmark) => {
            removeBookmark(bookmark.slug, bookmark.locale)
        })
        setShowClearConfirm(false)
    }

    if (bookmarkPosts.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-4xl">
                <div className="text-center py-16 sm:py-20">
                    <BookmarkX className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-muted-foreground/40 mb-6" />
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                        {t.title}
                    </h1>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        {t.emptyDescription}
                    </p>
                    <Link
                        href="/en"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        Browse Articles
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground flex items-center gap-3">
                        <Bookmark className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                        {t.title}
                    </h1>
                    <p className="text-muted-foreground">
                        {bookmarkPosts.length} saved {bookmarkPosts.length === 1 ? "article" : "articles"}
                    </p>
                </div>
                {bookmarkPosts.length > 0 && (
                    <div className="flex items-center gap-3">
                        {showClearConfirm ? (
                            <>
                                <button
                                    onClick={handleClearAll}
                                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm font-medium"
                                >
                                    {t.clearAllConfirm}
                                </button>
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
                                >
                                    {t.clearAllCancel}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowClearConfirm(true)}
                                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
                            >
                                {t.clearAll}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bookmarkPosts.map((post) => (
                    <ArticleCard key={`${post.slug}-${post.locale}`} post={post} />
                ))}
            </div>
        </div>
    )
}

