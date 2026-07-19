import { getMDXComponent } from "next-contentlayer2/hooks"
import { createMdxComponents } from "@/components/mdx-components.server"

export function MdxContent({ code, isEnglish = false }: { code: string; isEnglish?: boolean }) {
    const MDXContent = getMDXComponent(code)
    return <MDXContent components={createMdxComponents(isEnglish)} />
}

