import Link from "next/link"
import { allPosts, type Post } from ".contentlayer/generated"

interface RelatedPostsProps {
    currentSlug: string
    locale: "ru" | "en"
    limit?: number
}

/**
 * Вычисляет релевантность статьи на основе общих тегов, keywords и текстовой схожести
 */
function calculateRelevance(currentPost: Post, candidatePost: Post): number {
    let score = 0

    // 1. Общие теги (самый важный фактор - 50 баллов за каждый общий тег)
    const currentTags = (currentPost.tags || []).map(t => t.toLowerCase())
    const candidateTags = (candidatePost.tags || []).map(t => t.toLowerCase())
    const commonTags = currentTags.filter(tag => candidateTags.includes(tag))
    score += commonTags.length * 50

    // 2. Общие keywords (30 баллов за каждый общий keyword)
    const currentKeywords = (currentPost.keywords || []).map(k => k.toLowerCase())
    const candidateKeywords = (candidatePost.keywords || []).map(k => k.toLowerCase())
    const commonKeywords = currentKeywords.filter(kw => candidateKeywords.includes(kw))
    score += commonKeywords.length * 30

    // 3. Текстовая схожесть заголовков (до 20 баллов)
    const currentTitleWords = currentPost.title.toLowerCase().split(/\s+/)
    const candidateTitleWords = candidatePost.title.toLowerCase().split(/\s+/)
    const commonTitleWords = currentTitleWords.filter(word => 
        word.length > 3 && candidateTitleWords.includes(word)
    )
    score += commonTitleWords.length * 5

    // 4. Текстовая схожесть описаний (до 15 баллов)
    const currentDescWords = currentPost.description.toLowerCase().split(/\s+/)
    const candidateDescWords = candidatePost.description.toLowerCase().split(/\s+/)
    const commonDescWords = currentDescWords.filter(word => 
        word.length > 3 && candidateDescWords.includes(word)
    )
    score += commonDescWords.length * 3

    // 5. Бонус за свежесть (до 10 баллов - более свежие статьи получают небольшой бонус)
    const currentDate = new Date(currentPost.date).getTime()
    const candidateDate = new Date(candidatePost.date).getTime()
    const daysDiff = Math.abs((currentDate - candidateDate) / (1000 * 60 * 60 * 24))
    if (daysDiff < 30) score += 10
    else if (daysDiff < 90) score += 5
    else if (daysDiff < 180) score += 2

    return score
}

export function RelatedPosts({ currentSlug, locale, limit = 4 }: RelatedPostsProps) {
    // Находим текущую статью
    const currentPost = allPosts.find(
        post => post.slug === currentSlug && post.locale === locale
    )

    if (!currentPost) return null

    // Получаем все посты того же языка, исключая текущий
    const candidatePosts = allPosts.filter(
        post => post.locale === locale && post.slug !== currentSlug && !post.draft
    )

    if (candidatePosts.length === 0) return null

    // Вычисляем релевантность для каждой статьи
    const postsWithScore = candidatePosts.map(post => ({
        post,
        score: calculateRelevance(currentPost, post)
    }))

    // Сортируем по релевантности (по убыванию)
    postsWithScore.sort((a, b) => b.score - a.score)

    // Если есть статьи с релевантностью > 0, берем их
    // Если нет, берем случайные (fallback)
    const relatedPosts = postsWithScore
        .filter(item => item.score > 0)
        .map(item => item.post)
        .slice(0, limit)

    // Если не хватает статей с релевантностью, добавляем случайные
    if (relatedPosts.length < limit) {
        const randomPosts = candidatePosts
            .filter(post => !relatedPosts.find(rp => rp.slug === post.slug))
            .sort(() => Math.random() - 0.5)
            .slice(0, limit - relatedPosts.length)
        relatedPosts.push(...randomPosts)
    }

    if (relatedPosts.length === 0) return null

    const title = locale === "ru" ? "Читайте также" : "Related Articles"
    const readMore = locale === "ru" ? "Читать далее" : "Read more"

    return (
        <aside className="mt-8 sm:mt-12 p-4 sm:p-6 bg-card/80 dark:bg-muted/30 rounded-lg border border-border/50">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">{title}</h3>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${locale === "en" ? "en/" : ""}posts/${post.slug}`}
                        className="group block p-3 sm:p-4 bg-card dark:bg-card/80 rounded-md border-2 border-border/60 dark:border-border/40 hover:border-primary/50 dark:hover:border-primary/40 hover:shadow-md transition-all"
                    >
                        <h4 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                            {post.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-foreground/80 dark:text-foreground/70 line-clamp-2 mb-1.5 sm:mb-2">
                            {post.description}
                        </p>
                        <span className="text-xs sm:text-sm text-primary font-semibold">
                            {readMore} →
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    )
}
