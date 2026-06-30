import { ToolsPageTemplate } from "@/components/pages/tools-page"
import { getToolsDictionary } from "@/dictionaries/tools"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getToolsDictionary("ru")

export const metadata = getPageMetadata("/ru/tools", {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
})

export default function ToolsIndexPage() {
    return <ToolsPageTemplate dictionary={dictionary} />
}
