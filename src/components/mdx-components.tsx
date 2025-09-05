"use client"

import * as React from "react"
import Image from "next/image"
import { PaintCalculator } from "@/components/paint-calculator"

export const MDXComponents = {
    // Картинки
    img: ({ alt, src }: { alt?: string; src: string }) => (
        <span className="relative block overflow-hidden rounded-xl border max-w-xl mx-auto">
      <Image
          alt={alt ?? ""}
          src={src}
          width={600}
          height={600}
          className="h-auto w-full object-cover aspect-square"
          sizes="(max-width: 768px) 100vw, 600px"
      />
    </span>
    ),

    // Калькулятор краски
    PaintCalculator: () => (
        <div className="my-8">
            <PaintCalculator />
        </div>
    ),

    // Заголовки
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            id={String(props.children)?.toLowerCase().replace(/\s+/g, "-")}
            className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold"
            {...props}
        />
    ),

    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            id={String(props.children)?.toLowerCase().replace(/\s+/g, "-")}
            className="mt-8 scroll-m-20 text-xl font-semibold"
            {...props}
        />
    ),

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
