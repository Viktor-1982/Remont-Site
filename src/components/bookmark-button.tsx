"use client"

import { Bookmark, BookmarkCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBookmarks } from "@/lib/use-bookmarks"
import type { Post } from ".contentlayer/generated"

interface BookmarkButtonProps {
    post: Post
    variant?: "default" | "compact"
    className?: string
}

export function BookmarkButton({ post, variant = "default", className }: BookmarkButtonProps) {
    const { isBookmarked, toggleBookmark } = useBookmarks()
    const bookmarked = isBookmarked(post.slug, post.locale as "ru" | "en")
    const isEnglish = post.locale === "en"

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleBookmark(post)
    }

    const ariaLabel = bookmarked
        ? isEnglish
            ? "Remove from bookmarks"
            : "Удалить из закладок"
        : isEnglish
          ? "Add to bookmarks"
          : "Добавить в закладки"

    if (variant === "compact") {
        return (
            <button
                onClick={handleClick}
                aria-label={ariaLabel}
                className={cn(
                    "p-2 rounded-full transition-all",
                    "hover:bg-white/10 dark:hover:bg-white/10",
                    "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2",
                    "dark:focus:ring-offset-background",
                    className
                )}
            >
                {bookmarked ? (
                    <BookmarkCheck className="h-5 w-5 text-white fill-white" />
                ) : (
                    <Bookmark className="h-5 w-5 text-white/80 hover:text-white" />
                )}
            </button>
        )
    }

    return (
        <button
            onClick={handleClick}
            aria-label={ariaLabel}
            className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                "bg-card/80 dark:bg-card/60",
                "border border-border/60 dark:border-border/40",
                "hover:bg-card dark:hover:bg-card/80",
                "hover:border-primary/50 dark:hover:border-primary/40",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                "dark:focus:ring-offset-background",
                className
            )}
        >
            {bookmarked ? (
                <>
                    <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-sm font-medium text-foreground">
                        {post.locale === "en" ? "Saved" : "В закладках"}
                    </span>
                </>
            ) : (
                <>
                    <Bookmark className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                        {post.locale === "en" ? "Save" : "В закладки"}
                    </span>
                </>
            )}
        </button>
    )
}

