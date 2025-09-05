import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from ".contentlayer/generated"

export function ArticleCard({ post }: { post: Post }) {
    return (
        <Link href={post.url} className="group">
            <Card className="overflow-hidden transition-all hover:shadow-lg">
                {post.cover ? (
                    <div className="relative aspect-[16/9]">
                        <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 25vw"
                        />
                    </div>
                ) : (
                    <div className="aspect-[16/9] bg-muted" />
                )}

                <CardContent className="space-y-2 p-4">
                    {/* Дата + время чтения */}
                    <div className="text-xs text-muted-foreground">
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("ru-RU")}
                        </time>
                        {" · "}
                        {post.readingTime.minutes} мин чтения
                        {" · "}
                        {post.readingTime.words} слов
                    </div>

                    {/* Заголовок */}
                    <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>

                    {/* Описание */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.description}
                    </p>

                    {/* Теги */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {post.tags.slice(0, 4).map((t) => (
                                <Badge key={t} variant="secondary">
                                    #{t}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}
