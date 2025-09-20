"use client"

import { useMDXComponent } from "next-contentlayer2/hooks"
import type { MDXComponents } from "mdx/types"
import { mdxComponents } from "@/components/mdx-components"

export function MDXRenderer({
                                code,
                                components,
                            }: {
    code: string
    components?: MDXComponents
}) {
    const MDXContent = useMDXComponent(code)

    return (
        <MDXContent
            components={{
                ...mdxComponents,
                ...components,
            }}
        />
    )
}
