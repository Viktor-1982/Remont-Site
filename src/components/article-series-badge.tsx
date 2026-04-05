import { Badge } from "@/components/ui/badge"
import { getArticleSeriesMeta } from "@/lib/article-series"
import { cn } from "@/lib/utils"

interface ArticleSeriesBadgeProps {
    series?: string | null
    isEnglish?: boolean
    className?: string
}

export function ArticleSeriesBadge({
    series,
    isEnglish = false,
    className,
}: ArticleSeriesBadgeProps) {
    const meta = getArticleSeriesMeta(series, isEnglish ? "en" : "ru")

    if (!meta) {
        return null
    }

    return (
        <Badge
            variant="outline"
            className={cn(
                "border-transparent px-2.5 py-1 text-[11px] font-semibold",
                meta.className,
                className
            )}
        >
            {meta.label}
        </Badge>
    )
}
