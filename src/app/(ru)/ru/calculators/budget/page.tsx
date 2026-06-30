import { BudgetPageTemplate } from "@/components/pages/budget-page"
import { RenovationBudgetPlanner } from "@/components/widgets/renovation-budget-planner"
import { getBudgetPageDictionary, getBudgetPageMetadata } from "@/dictionaries/budget-page"

export const metadata = getBudgetPageMetadata("ru")

export default function BudgetPlannerPage() {
    const dictionary = getBudgetPageDictionary("ru")

    return <BudgetPageTemplate dictionary={dictionary} widget={<RenovationBudgetPlanner />} />
}
