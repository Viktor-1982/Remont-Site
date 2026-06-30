import { ToolsPageTemplate } from "@/components/pages/tools-page"
import { getToolsDictionary } from "@/dictionaries/tools"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getToolsDictionary("en")

export const metadata = getPageMetadata("/tools", {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "website",
})

export default function ToolsIndexPageEn() {
    return <ToolsPageTemplate dictionary={dictionary} />
}
