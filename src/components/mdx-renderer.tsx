"use client"

import { useMDXComponent } from "next-contentlayer2/hooks"
import { MDXComponents } from "@/components/mdx-components"

export function MDXRenderer({ code }: { code: string }) {
    const MDXContent = useMDXComponent(code)
    return <MDXContent components={MDXComponents as any} />
}
