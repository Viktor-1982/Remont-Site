import { Badge } from "@/components/ui/badge"
import { getArticleRubricMeta } from "@/lib/article-rubrics"
import { cn } from "@/lib/utils"

interface ArticleRubricBadgeProps {
    rubric?: string | null
    isEnglish?: boolean
    className?: string
}

export function ArticleRubricBadge({
    rubric,
    isEnglish = false,
    className,
}: ArticleRubricBadgeProps) {
    const meta = getArticleRubricMeta(rubric, isEnglish ? "en" : "ru")

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
