"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { Post } from ".contentlayer/generated"

interface KeyboardShortcutsProps {
    isEnglish?: boolean
}

export function KeyboardShortcuts({ isEnglish = false }: KeyboardShortcutsProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [showHelp, setShowHelp] = useState(false)
    const [posts, setPosts] = useState<Post[]>([])

    // Загружаем посты для навигации
    useEffect(() => {
        if (pathname === "/" || pathname === "/en") {
            fetch("/api/posts")
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        const filtered = data
                            .filter((p: Post) => p.locale === (pathname === "/en" ? "en" : "ru"))
                            .filter((p: Post) => !p.draft)
                            .sort((a: Post, b: Post) => {
                                const ta = a.date ? new Date(a.date).getTime() : 0
                                const tb = b.date ? new Date(b.date).getTime() : 0
                                return tb - ta
                            })
                        setPosts(filtered)
                    }
                })
                .catch(() => {
                    // Игнорируем ошибки
                })
        }
    }, [pathname])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Игнорируем, если пользователь вводит текст
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target instanceof HTMLElement && e.target.isContentEditable)
            ) {
                return
            }

            // j/k - навигация по статьям на главной странице
            if ((e.key === "j" || e.key === "k") && (pathname === "/" || pathname === "/en") && posts.length > 0) {
                e.preventDefault()
                const currentIndex = parseInt(sessionStorage.getItem("currentPostIndex") || "0")
                let newIndex = currentIndex

                if (e.key === "j") {
                    newIndex = Math.min(posts.length - 1, currentIndex + 1)
                } else if (e.key === "k") {
                    newIndex = Math.max(0, currentIndex - 1)
                }

                sessionStorage.setItem("currentPostIndex", newIndex.toString())

                if (posts[newIndex]) {
                    router.push(posts[newIndex].url)
                }
            }

            // ? - показать помощь
            if (e.key === "?") {
                e.preventDefault()
                setShowHelp((prev) => !prev)
            }

            // Esc - закрыть модалки
            if (e.key === "Escape") {
                setShowHelp(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [router, pathname, posts])

    // Сбрасываем индекс при переходе на главную
    useEffect(() => {
        if (pathname === "/" || pathname === "/en") {
            sessionStorage.setItem("currentPostIndex", "0")
        }
    }, [pathname])

    return (
        <>
            {showHelp && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in"
                    onClick={() => setShowHelp(false)}
                >
                    <div
                        className="bg-card border rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-in slide-in-from-bottom-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            {isEnglish ? "Keyboard Shortcuts" : "Горячие клавиши"}
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {isEnglish ? "Search" : "Поиск"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">/</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {isEnglish ? "Next article" : "Следующая статья"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">j</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {isEnglish ? "Previous article" : "Предыдущая статья"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">k</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {isEnglish ? "Show help" : "Показать помощь"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">?</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {isEnglish ? "Close" : "Закрыть"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Esc</kbd>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => setShowHelp(false)}
                        >
                            {isEnglish ? "Close" : "Закрыть"}
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

