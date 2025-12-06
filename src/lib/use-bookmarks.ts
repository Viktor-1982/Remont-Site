"use client"

import { useState, useEffect, useCallback } from "react"
import type { Post } from ".contentlayer/generated"

const STORAGE_KEY = "renohacks-bookmarks"

export interface BookmarkData {
    slug: string
    locale: "ru" | "en"
    title: string
    description?: string
    cover?: string
    url: string
    date: string
    addedAt: number // timestamp
}

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<BookmarkData[]>([])

    // Загружаем закладки при монтировании
    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored)
                setBookmarks(Array.isArray(parsed) ? parsed : [])
            }
        } catch (e) {
            console.error("Failed to load bookmarks:", e)
        }
    }, [])

    // Сохраняем закладки в localStorage
    const saveBookmarks = useCallback((newBookmarks: BookmarkData[]) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks))
            setBookmarks(newBookmarks)
        } catch (e) {
            console.error("Failed to save bookmarks:", e)
        }
    }, [])

    // Добавляем закладку
    const addBookmark = useCallback(
        (post: Post) => {
            const bookmark: BookmarkData = {
                slug: post.slug,
                locale: post.locale as "ru" | "en",
                title: post.title,
                description: post.description,
                cover: post.cover,
                url: post.url,
                date: post.date,
                addedAt: Date.now(),
            }

            const newBookmarks = [...bookmarks, bookmark]
            saveBookmarks(newBookmarks)
        },
        [bookmarks, saveBookmarks]
    )

    // Удаляем закладку
    const removeBookmark = useCallback(
        (slug: string, locale: "ru" | "en") => {
            const newBookmarks = bookmarks.filter(
                (b) => !(b.slug === slug && b.locale === locale)
            )
            saveBookmarks(newBookmarks)
        },
        [bookmarks, saveBookmarks]
    )

    // Проверяем, есть ли статья в закладках
    const isBookmarked = useCallback(
        (slug: string, locale: "ru" | "en") => {
            return bookmarks.some((b) => b.slug === slug && b.locale === locale)
        },
        [bookmarks]
    )

    // Переключаем закладку (добавить/удалить)
    const toggleBookmark = useCallback(
        (post: Post) => {
            if (isBookmarked(post.slug, post.locale as "ru" | "en")) {
                removeBookmark(post.slug, post.locale as "ru" | "en")
            } else {
                addBookmark(post)
            }
        },
        [isBookmarked, addBookmark, removeBookmark]
    )

    // Получаем закладки для конкретного языка
    const getBookmarksByLocale = useCallback(
        (locale: "ru" | "en") => {
            return bookmarks
                .filter((b) => b.locale === locale)
                .sort((a, b) => b.addedAt - a.addedAt) // Сначала новые
        },
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

