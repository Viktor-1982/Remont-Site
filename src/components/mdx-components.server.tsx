import * as React from "react"
import Image from "next/image"
import GitHubSlugger from "github-slugger"
import type { MDXComponents } from "mdx/types"

const getTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === "string") return children
    if (typeof children === "number") return children.toString()
    if (!children) return ""

    if (Array.isArray(children)) {
        return children.map(getTextFromChildren).join("")
    }

    if (React.isValidElement(children)) {
        const childProps = children.props as { children?: React.ReactNode }
        if (childProps.children) {
            return getTextFromChildren(childProps.children)
        }
    }

    return ""
}

function MdxImage({ alt, src }: { alt?: string; src: string }) {
    return (
        <figure className="relative mx-auto my-6 max-w-3xl w-full overflow-hidden rounded-xl bg-background">
            <Image
                alt={alt && alt.trim() !== "" ? alt : "Изображение по теме ремонта"}
                src={src}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
            {alt && <figcaption className="mt-2 text-sm text-muted-foreground">{alt}</figcaption>}
        </figure>
    )
}

export function createMdxComponents(): MDXComponents {
    const slugger = new GitHubSlugger()

    return {
        img: MdxImage,
        h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
            const text = getTextFromChildren(props.children)
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
        h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
            const text = getTextFromChildren(props.children)
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
            const text = getTextFromChildren(props.children)
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
        p: (props: React.HTMLAttributes<HTMLParagraphElement>) => {
            const childrenArray = React.Children.toArray(props.children)
            const containsStandaloneMedia = childrenArray.some((child) => {
                if (!React.isValidElement(child)) return false
                const type = child.type
                if (type === "img" || type === "figure") return true
                if (typeof type === "function" && "displayName" in type && type.displayName === "Image") {
                    return true
                }
                const childProps = child.props as Record<string, unknown>
                return "src" in childProps && typeof childProps.src === "string"
            })

            if (containsStandaloneMedia) {
                const { children, ...rest } = props
                return (
                    <div className="leading-7 text-foreground [&:not(:first-child)]:mt-4" {...rest}>
                        {children}
                    </div>
                )
            }

            return (
                <p className="leading-7 text-foreground [&:not(:first-child)]:mt-4" {...props} />
            )
        },
        ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
            <ul className="ml-6 list-disc [&>li]:mt-2 [&>li]:text-foreground" {...props} />
        ),
        ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
            <ol className="ml-6 list-decimal [&>li]:mt-2 [&>li]:text-foreground" {...props} />
        ),
        blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props} />
        ),
    }
}

