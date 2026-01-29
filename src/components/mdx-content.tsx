import { getMDXComponent } from "next-contentlayer2/hooks"
import { createMdxComponents } from "@/components/mdx-components.server"

export function MdxContent({ code }: { code: string }) {
    const MDXContent = getMDXComponent(code)
    return <MDXContent components={createMdxComponents()} />
}

