import { Metadata } from "next"
import { MaterialsChecklist } from "@/components/materials-checklist"

export const metadata: Metadata = {
    title: "Materials Purchase Checklist for Renovation | Renohacks",
    description:
        "Complete list of renovation materials with ability to mark purchased items. Never forget to buy anything for your renovation. Export and import checklist.",
    openGraph: {
        title: "Materials Purchase Checklist for Renovation",
        description: "Track all materials needed for your renovation",
        type: "website",
    },
}

export default function MaterialsChecklistPage() {
    return (
        <div className="container py-12 md:py-16">
            <MaterialsChecklist isEnglish={true} />
        </div>
    )
}


