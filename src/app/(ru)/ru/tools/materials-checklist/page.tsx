import { getPageMetadata } from "@/lib/seo"
import { MaterialsChecklist } from "@/components/materials-checklist"

export const metadata = getPageMetadata("/ru/tools/materials-checklist", {
    title: "Чеклист покупок материалов для ремонта | Renohacks",
    description:
        "Интерактивный чеклист покупок материалов для ремонта: составьте полный список, отмечайте купленное, экспортируйте и импортируйте данные. Планируйте закупки!",
    cover: "/images/og-default.png",
    type: "website",
})

export default function MaterialsChecklistPage() {
    return (
        <div className="container py-12 md:py-16">
            <MaterialsChecklist />
        </div>
    )
}


