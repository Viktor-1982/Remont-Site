"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { fetchPostIndex, type PostIndexItem } from "@/lib/post-index"

interface KeyboardShortcutsProps {
    isEnglish?: boolean
}

export function KeyboardShortcuts({ isEnglish }: KeyboardShortcutsProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [showHelp, setShowHelp] = useState(false)
    const [posts, setPosts] = useState<PostIndexItem[]>([])
    const localeIsEnglish =
        isEnglish ?? (pathname === "/en" || pathname.startsWith("/en/"))

    useEffect(() => {
        if (pathname !== "/" && pathname !== "/en") {
            return
        }

        fetchPostIndex()
            .then((data) => {
                const filtered = data
                    .filter((post) => post.locale === (pathname === "/en" ? "en" : "ru"))
                    .sort((a, b) => {
                        const ta = a.date ? new Date(a.date).getTime() : 0
                        const tb = b.date ? new Date(b.date).getTime() : 0
                        return tb - ta
                    })

                setPosts(filtered)
            })
            .catch(() => {
                // Ignore fetch errors for optional keyboard navigation helpers.
            })
    }, [pathname])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement ||
                (event.target instanceof HTMLElement && event.target.isContentEditable)
            ) {
                return
            }

            if ((event.key === "j" || event.key === "k") && (pathname === "/" || pathname === "/en") && posts.length > 0) {
                event.preventDefault()
                const currentIndex = parseInt(sessionStorage.getItem("currentPostIndex") || "0")
                let newIndex = currentIndex

                if (event.key === "j") {
                    newIndex = Math.min(posts.length - 1, currentIndex + 1)
                } else {
                    newIndex = Math.max(0, currentIndex - 1)
                }

                sessionStorage.setItem("currentPostIndex", newIndex.toString())

                if (posts[newIndex]) {
                    router.push(posts[newIndex].url)
                }
            }

            if (event.key === "?") {
                event.preventDefault()
                setShowHelp((prev) => !prev)
            }

            if (event.key === "Escape") {
                setShowHelp(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [pathname, posts, router])

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
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4">
                            {localeIsEnglish ? "Keyboard Shortcuts" : "Горячие клавиши"}
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {localeIsEnglish ? "Search" : "Поиск"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">/</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {localeIsEnglish ? "Next article" : "Следующая статья"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">j</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {localeIsEnglish ? "Previous article" : "Предыдущая статья"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">k</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {localeIsEnglish ? "Show help" : "Показать помощь"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">?</kbd>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    {localeIsEnglish ? "Close" : "Закрыть"}
                                </span>
                                <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Esc</kbd>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => setShowHelp(false)}
                        >
                            {localeIsEnglish ? "Close" : "Закрыть"}
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}
