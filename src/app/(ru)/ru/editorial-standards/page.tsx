import { EditorialStandardsPageTemplate } from "@/components/pages/editorial-standards-page"
import { getEditorialStandardsDictionary } from "@/dictionaries/editorial-standards"
import { getPageMetadata } from "@/lib/seo"

const dictionary = getEditorialStandardsDictionary("ru")

export const metadata = getPageMetadata(dictionary.path, {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    cover: "/images/og-default.png",
    type: "article",
})

export default function EditorialStandardsPageRu() {
    return <EditorialStandardsPageTemplate dictionary={dictionary} />
}
