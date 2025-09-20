import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Post } from ".contentlayer/generated"

export function ArticleHero({ post }: { post: Post }) {
    return (
        <div className="space-y-6">
            {/* Дата + время чтения */}
            <div className="text-sm text-muted-foreground">
                {post.date
                    ? new Date(post.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                    : null}
                {post.readingTime?.minutes
                    ? ` · ${post.readingTime.minutes} мин чтения`
                    : null}
            </div>

            {/* Заголовок */}
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                {post.title}
            </h1>

            {/* Описание */}
            {post.description && (
                <p className="text-muted-foreground text-lg">{post.description}</p>
            )}

            {/* Обложка */}
            {post.cover && (
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl border">
                    <Image
                        src={post.cover}
                        alt={`Обложка статьи: ${post.title}`}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    />
                </div>
            )}

            {/* Теги */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                        <Badge
                            key={t}
                            variant="secondary"
                            className="text-sm px-3 py-1 rounded-full"
                        >
                            #{t}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}
