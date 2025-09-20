"use client"

import * as React from "react"
import Image from "next/image"
import GitHubSlugger from "github-slugger"
import type { MDXComponents } from "mdx/types"

// Импорты калькуляторов
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

const slugger = new GitHubSlugger()

export const mdxComponents: MDXComponents = {
    // Картинки
    img: ({ alt, src }: { alt?: string; src: string }) => (
        <span className="relative block overflow-hidden rounded-xl border max-w-3xl mx-auto">
      <Image
          alt={alt ?? ""}
          src={src}
          width={1200}
          height={800}
          className="h-auto w-full object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 1200px"
      />
    </span>
    ),

    // Калькуляторы
    PaintCalculator: () => (
        <div className="my-8">
            <PaintCalculator />
        </div>
    ),
    TileCalculator: () => (
        <div className="my-8">
            <TileCalculator />
        </div>
    ),
    WallpaperCalculator: () => (
        <div className="my-8">
            <WallpaperCalculator />
        </div>
    ),

    // Заголовки
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const text = String(props.children)
        const id = slugger.slug(text)
        return (
            <h2
                id={id}
                className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold"
                {...props}
            />
        )
    },

    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const text = String(props.children)
        const id = slugger.slug(text)
        return (
            <h3
                id={id}
                className="mt-8 scroll-m-20 text-xl font-semibold"
                {...props}
            />
        )
    },

    // Абзацы
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-4"
            {...props}
        />
    ),

    // Списки
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="ml-6 list-disc [&>li]:mt-2" {...props} />
    ),

    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="ml-6 list-decimal [&>li]:mt-2" {...props} />
    ),

    // Цитаты
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
        <blockquote
            className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
            {...props}
        />
    ),
}
