"use client"

import { useState, useEffect, useCallback } from "react"
import type { ArticleCardPost, Locale } from "@/lib/post-index"

const STORAGE_KEY = "renohacks-bookmarks"

export interface BookmarkData extends ArticleCardPost {
    locale: Locale
    date: string
    addedAt: number
}

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<BookmarkData[]>([])

    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored)
                setBookmarks(Array.isArray(parsed) ? parsed : [])
            }
        } catch (error) {
            console.error("Failed to load bookmarks:", error)
        }
    }, [])

    const saveBookmarks = useCallback((newBookmarks: BookmarkData[]) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks))
            setBookmarks(newBookmarks)
        } catch (error) {
            console.error("Failed to save bookmarks:", error)
        }
    }, [])

    const addBookmark = useCallback(
        (post: ArticleCardPost) => {
            const bookmark: BookmarkData = {
                slug: post.slug,
                locale: post.locale === "en" ? "en" : "ru",
                title: post.title,
                description: post.description,
                cover: post.cover,
                url: post.url,
                date: post.date ?? "",
                readingTime: post.readingTime,
                tags: post.tags,
                _id: post._id,
                addedAt: Date.now(),
            }

            saveBookmarks([...bookmarks, bookmark])
        },
        [bookmarks, saveBookmarks]
    )

    const removeBookmark = useCallback(
        (slug: string, locale: Locale) => {
            const newBookmarks = bookmarks.filter(
                (bookmark) => !(bookmark.slug === slug && bookmark.locale === locale)
            )
            saveBookmarks(newBookmarks)
        },
        [bookmarks, saveBookmarks]
    )

    const isBookmarked = useCallback(
        (slug: string, locale: Locale) =>
            bookmarks.some((bookmark) => bookmark.slug === slug && bookmark.locale === locale),
        [bookmarks]
    )

    const toggleBookmark = useCallback(
        (post: ArticleCardPost) => {
            const locale = post.locale === "en" ? "en" : "ru"

            if (isBookmarked(post.slug, locale)) {
                removeBookmark(post.slug, locale)
                return
            }

            addBookmark(post)
        },
        [addBookmark, isBookmarked, removeBookmark]
    )

    const getBookmarksByLocale = useCallback(
        (locale: Locale) =>
            bookmarks
                .filter((bookmark) => bookmark.locale === locale)
                .sort((a, b) => b.addedAt - a.addedAt),
        [bookmarks]
    )

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
        getBookmarksByLocale,
    }
}
