﻿"use client"

import * as React from "react"
import Image from "next/image"
import GitHubSlugger from "github-slugger"
import type { MDXComponents } from "mdx/types"
import { useMDXComponent } from "next-contentlayer2/hooks"

// Импорты калькуляторов
import { PaintCalculator } from "@/components/widgets/paint-calculator"
import { TileCalculator } from "@/components/widgets/tile-calculator"
import { WallpaperCalculator } from "@/components/widgets/wallpaper-calculator"

// 🔹 Словарь компонентов, доступных в MDX
export const mdxComponents: MDXComponents = {
    // Картинки
    img: ({ alt, src }: { alt?: string; src: string }) => (
        <div className="relative block overflow-hidden rounded-xl mx-auto my-6 bg-background max-w-3xl w-full">
            <Image
                alt={alt && alt.trim() !== "" ? alt : "Изображение по теме ремонта"}
                src={src}
                width={1200}
                height={800}
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            {alt && (
                <div className="mt-2 text-center text-sm text-muted-foreground">
                    {alt}
                </div>
            )}
        </div>
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
        const slugger = new GitHubSlugger()
        const text = String(props.children)
        const id = slugger.slug(text)
        return (
            <h2
                id={id}
                aria-label={text}
                className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold"
                {...props}
            />
        )
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
        const slugger = new GitHubSlugger()
        const text = String(props.children)
        const id = slugger.slug(text)
        return (
            <h3
                id={id}
                aria-label={text}
                className="mt-8 scroll-m-20 text-xl font-semibold"
                {...props}
            />
        )
    },

    // Абзацы — фикс чтобы картинки не попадали в <p>
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
        let onlyChild: React.ReactElement | null = null

        try {
            onlyChild = React.Children.only(props.children) as React.ReactElement
        } catch {
            onlyChild = null
        }

        if (
            onlyChild &&
            (onlyChild.type === "img" ||
                (React.isValidElement(onlyChild) &&
                    "src" in (onlyChild.props as Record<string, unknown>)))
        ) {
            // 🚫 Если в параграфе только картинка → заменяем <p> на <div>
            return <div {...props} />
        }

        return (
            <p
                className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-4"
                {...props}
            />
        )
    },

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

// 🔹 Обёртка для рендера MDX
export function Mdx({ code }: { code: string }) {
    const MDXContent = useMDXComponent(code)
    return (
        <div className="prose dark:prose-invert max-w-none">
            <MDXContent components={mdxComponents} />
        </div>
    )
}
