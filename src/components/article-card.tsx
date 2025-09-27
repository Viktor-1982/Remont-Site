import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from ".contentlayer/generated"

export function ArticleCard({ post }: { post: Post }) {
    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg group">
            {/* Обложка */}
            {post.cover ? (
                <div
                    className="
                        relative 
                        aspect-[16/9] 
                        w-full 
                        max-h-48
                        overflow-hidden 
                        rounded-t-lg
                    "
                >
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                </div>
            ) : (
                <div className="aspect-[16/9] bg-muted rounded-t-lg" />
            )}

            <CardContent className="flex flex-col flex-1 space-y-2 p-4">
                {/* Дата + время чтения */}
                <div className="text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </time>
                    {" · "}
                    {post.readingTime.minutes} мин чтения
                    {" · "}
                    {post.readingTime.words} слов
                </div>

                {/* Заголовок */}
                <h3 className="text-lg font-semibold leading-snug transition-colors hover:text-primary">
                    <Link href={post.url}>{post.title}</Link>
                </h3>

                {/* Описание */}
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                    {post.description}
                </p>

                {/* Теги (прижаты вниз) */}
                <div className="mt-auto">
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {post.tags.slice(0, 4).map((t) => (
                                <Link key={t} href={`/tags/${t}`} className="hover:underline">
                                    <Badge variant="secondary">#{t}</Badge>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
