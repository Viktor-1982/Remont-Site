"use client"

import { useMDXComponent } from "next-contentlayer2/hooks"
import type { MDXComponents } from "mdx/types"
import { mdxComponents } from "@/components/mdx-components"

interface MDXRendererProps {
    code: string
    components?: MDXComponents
}

export function MDXRenderer({ code, components }: MDXRendererProps) {
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
