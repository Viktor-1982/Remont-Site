import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Post } from ".contentlayer/generated"

export function ArticleHero({ post }: { post: Post }) {
    return (
        <div className="space-y-6">
            {/* Дата + время чтения */}
            <div className="text-sm text-muted-foreground">
                {post.date && (
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </time>
                )}
                {post.readingTime?.minutes && ` · ${post.readingTime.minutes} мин чтения`}
            </div>

            {/* Заголовок */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {post.title}
            </h1>

            {/* Описание */}
            {post.description && (
                <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
                    {post.description}
                </p>
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
                        <Link key={t} href={`/tags/${t}`}>
                            <Badge
                                variant="secondary"
                                className="text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-white transition"
                            >
                                #{t}
                            </Badge>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
