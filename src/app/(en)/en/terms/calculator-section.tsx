"use client"

import { useCallback } from "react"
import dynamic from "next/dynamic"

const RenovationBudgetPlannerEn = dynamic(
  () =>
    import("@/components/widgets/renovation-budget-planner-en").then(
      (m) => m.RenovationBudgetPlannerEn
    ),
  { ssr: false, loading: () => <p>Loading calculator...</p> }
)

export default function CalculatorSection() {
  const handleCalculate = useCallback(() => {
    window.dataLayer?.push({
      event: "budget_calculation",
      category: "Calculator",
      label: "Budget EN",
    })
  }, [])

  return (
    <section aria-label="Interactive renovation budget planner calculator">
      <RenovationBudgetPlannerEn onCalculate={handleCalculate} />
    </section>
  )
}

