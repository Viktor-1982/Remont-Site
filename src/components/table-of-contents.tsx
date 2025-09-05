"use client"

import Link from "next/link"
import type { Post } from ".contentlayer/generated"

type Heading = {
    level: number
    text: string
    slug: string
}

export function TableOfContents({ post }: { post: Post }) {
    const headings = (post.headings as unknown as Heading[])?.filter(
        (h) => h && typeof h.slug === "string" && typeof h.text === "string"
    )

    if (!headings || headings.length === 0) return null

    return (
        <nav className="sticky top-24 hidden max-h-[70vh] w-64 shrink-0 overflow-auto rounded-xl border p-4 text-sm lg:block">
            <div className="mb-2 font-semibold">Оглавление</div>
            <ul className="space-y-1">
                {headings.map((h) => (
                    <li key={h.slug} className={h.level === 3 ? "ml-4" : "ml-0"}>
                        <Link href={`#${h.slug}`} className="text-muted-foreground hover:text-foreground">
                            {h.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
