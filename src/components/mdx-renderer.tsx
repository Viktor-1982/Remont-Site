"use client"

import { useMDXComponent } from "next-contentlayer2/hooks"
import type { MDXComponents } from "mdx/types"
import { MDXComponents as CustomMDXComponents } from "@/components/mdx-components"

export function MDXRenderer({ code }: { code: string }) {
    const MDXContent = useMDXComponent(code)

    return (
        <MDXContent components={CustomMDXComponents as MDXComponents} />
    )
}
