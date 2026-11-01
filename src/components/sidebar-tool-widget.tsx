import Link from "next/link"
import { ArrowRight, Calculator } from "lucide-react"
import { getArticleTools, type ArticleToolLocale } from "@/lib/article-tools"
import type { Post } from ".contentlayer/generated"

interface SidebarToolWidgetProps {
    post: Post
    locale: ArticleToolLocale
}

export function SidebarToolWidget({ post, locale }: SidebarToolWidgetProps) {
    const { primary } = getArticleTools(post, locale)

    const isEnglish = locale === "en"
    const heading = isEnglish ? "Project Calculator" : "Калькулятор к статье"
    const subtitle = isEnglish ? "Quick estimate before you buy:" : "Быстрый расчет перед закупкой:"

    return (
        <div className="hidden lg:block mt-6 p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-card/90 via-primary/[0.04] to-card/90 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Calculator className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {heading}
                </span>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3">
                {subtitle}
            </p>

            <div className="p-3 rounded-lg border border-border/60 bg-background/80 hover:border-primary/40 transition-colors">
                <div className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
                    {primary.title}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {primary.description}
                </p>
                <Link
                    href={primary.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2 transition-all"
                >
                    {primary.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        </div>
    )
}
