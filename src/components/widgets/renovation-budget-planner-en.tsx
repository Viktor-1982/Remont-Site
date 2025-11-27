"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Plus, Trash2, PiggyBank, Wallet, DollarSign } from "lucide-react"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, BudgetCalcDict, ButtonsDict } from "@/types/calc"
import { computeBudget } from "@/lib/calculations"

const calcData = calcDataJson as CalcData

const renovationCategories = [
  "Demolition work",
  "Rough finishing",
  "Electrical work",
  "Plumbing",
  "Wall finishing (plaster, putty)",
  "Wallpaper installation",
  "Wall painting",
  "Tile installation",
  "Stretch ceilings",
  "Ceiling painting",
  "Interior door installation",
  "Entrance door installation",
  "Laminate flooring",
  "Parquet flooring",
  "Linoleum flooring",
  "Baseboard installation",
  "PVC window installation",
  "Wooden window installation",
  "Balcony finishing",
  "Kitchen installation",
  "Bathroom finishing",
  "Toilet finishing",
  "Shower cabin installation",
  "Bathtub installation",
  "Toilet installation",
  "Faucet installation",
  "Outlets and switches installation",
  "Meter installation",
  "Underfloor heating",
  "Soundproofing",
  "Insulation",
]

const currencies = [
  { code: "USD", symbol: "$", name: "Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
]

interface ExpenseItem {
  id: number
  category: string
  cost: string
}

interface RenovationBudgetPlannerEnProps {
  onCalculate?: () => void
}

export function RenovationBudgetPlannerEn({ onCalculate }: RenovationBudgetPlannerEnProps) {
  const locale: Locale = "en"

  const t: BudgetCalcDict = calcData[locale].calc.budget
  const b: ButtonsDict = calcData[locale].calc.buttons

  const [items, setItems] = useState<ExpenseItem[]>([{ id: 1, category: "", cost: "" }])
  const [reserve, setReserve] = useState("20")
  const [currency, setCurrency] = useState("USD")
  const [subtotal, setSubtotal] = useState<number>(0)
  const [reserveAmount, setReserveAmount] = useState<number>(0)
  const [total, setTotal] = useState<number | null>(null)
  const [nextId, setNextId] = useState(2)

  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0]

  const addCategory = () => {
    setItems([...items, { id: nextId, category: "", cost: "" }])
    setNextId(nextId + 1)
  }

  const removeCategory = (id: number) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const updateCategory = (id: number, field: keyof ExpenseItem, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculate = () => {
    const costs = items.map((item) => {
      const cost = parseFloat(item.cost.replace(",", ".").replace(/[^0-9.-]/g, "")) || 0
      return cost
    })

    const reservePercent = parseFloat(reserve.replace(",", ".").replace(/[^0-9.-]/g, "")) || 0

    const { subtotal: sum, reserveAmount: reserveValue, total: finalTotal } = computeBudget({
      items: costs,
      reservePercent,
    })

    if (!isFinite(sum) || !isFinite(reserveValue) || !isFinite(finalTotal)) return

    setSubtotal(sum)
    setReserveAmount(reserveValue)
    setTotal(finalTotal)

    onCalculate?.()
  }

  const buildSummary = () => {
    const lines = items
      .filter((item) => item.category && item.cost)
      .map((item) => {
        const cost = parseFloat(item.cost.replace(",", ".")) || 0
        return `- ${item.category}: ${selectedCurrency.symbol}${cost.toLocaleString("en-US")}`
      })

    const header =
      total !== null
        ? `Renovation budget — total ${selectedCurrency.symbol}${total.toLocaleString("en-US")} (reserve ${reserve}%).`
        : "Preliminary renovation budget."

    return [header, "", "Categories:", ...lines].join("\n")
  }

  const handlePrint = () => {
    if (typeof window === "undefined") return

    const summaryText = buildSummary()

    const printWindow = window.open("", "_blank", "width=800,height=1000")
    if (!printWindow) return

    const doc = printWindow.document
    doc.open()
    doc.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <title>Renovation budget — renohacks.com</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; color: #111827; }
      h1 { font-size: 20px; margin-bottom: 12px; }
      p { margin: 4px 0; }
      pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
      .source { font-size: 12px; color: #4b5563; margin-top: 16px; }
    </style>
  </head>
  <body>
    <h1>Renovation budget</h1>
    <pre>`)
    doc.write(summaryText)
    doc.write(`</pre>
    <p class="source">Source: renohacks.com — online calculators and renovation guides.</p>
  </body>
</html>`)
    doc.close()
    printWindow.focus()
    printWindow.print()
  }

  const handleShareSummary = async () => {
    const summary = buildSummary()

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Renovation budget — Renohacks",
          text: summary,
        })
        return
      } catch {
        // user cancelled — continue to clipboard fallback
      }
    }

    try {
      await navigator.clipboard.writeText(summary)
    } catch {
      // clipboard not available — silently ignore
    }
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary/15 via-transparent to-accent/20 blur-3xl opacity-60" />
      {/* 👁 Main UI — only on screen */}
      <div className="no-print relative space-y-6 rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_45%),_var(--background)] p-6 md:p-8 shadow-[0_25px_80px_-35px_rgba(79,70,229,0.8)] transition">
        <div className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Calculator className="h-3.5 w-3.5" /> Renohacks Pro Tool
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
        <p className="text-sm text-muted-foreground">
          Structure renovation costs by category, add contingency, and get a client-ready total in seconds.
        </p>
      </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              data-testid="expense-item"
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br from-card via-card to-primary/5 p-4 shadow-sm transition hover:border-primary/40 hover:shadow-xl"
            >
              <div className="pointer-events-none absolute inset-y-4 left-2 w-1 rounded-full bg-primary/20 transition group-hover:bg-primary/60" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">#{index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => removeCategory(item.id)}
                  disabled={items.length === 1}
                  aria-label={t.remove}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative flex flex-col gap-3 md:flex-row">
                <div className="flex-1">
                  <label className="text-xs font-medium text-muted-foreground">{t.category}</label>
                  <input
                    type="text"
                    list={`categories-${item.id}`}
                    placeholder="e.g. Demolition or framing"
                    className="mt-1 w-full rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={item.category}
                    onChange={(e) => updateCategory(item.id, "category", e.target.value)}
                  />
                  <datalist id={`categories-${item.id}`}>
                    {renovationCategories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <div className="w-full md:w-40">
                  <label className="text-xs font-medium text-muted-foreground">{t.cost} ({selectedCurrency.symbol})</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    className="mt-1 w-full rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-right text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    value={item.cost}
                    onChange={(e) => updateCategory(item.id, "cost", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addCategory}
          className="w-full rounded-2xl border-dashed border-primary/50 bg-gradient-to-r from-transparent via-primary/5 to-transparent py-6 text-base font-semibold text-primary shadow-inner hover:border-primary hover:bg-primary/10"
        >
          <Plus className="mr-2 h-4 w-4" /> {t.addCategory}
        </Button>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
          <label className="text-xs font-medium text-muted-foreground">{t.currency}</label>
          <div className="mt-2 relative">
            <select
              className="w-full appearance-none rounded-xl border border-border/70 bg-background/70 px-4 py-3 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.symbol} {curr.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-muted-foreground md:block">⌄</span>
          </div>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
          <label className="text-xs font-medium text-muted-foreground">{t.reserve}</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="number"
              min="0"
              max="50"
              className="w-20 rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-center text-sm font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={reserve}
              onChange={(e) => setReserve(e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="50"
              value={parseInt(reserve || "0", 10)}
              onChange={(e) => setReserve(e.target.value)}
              className="flex-1 accent-primary"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">20–25% keeps your remodeling budget safe</p>
        </div>
      </div>

      <Button
        onClick={calculate}
        className="w-full rounded-2xl bg-gradient-to-r from-primary to-primary/80 py-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:translate-y-0 hover:brightness-110"
        size="lg"
      >
        {b.calculate}
      </Button>

        {total !== null && (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:from-card dark:to-emerald-500/10">
                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                  <Wallet className="h-3.5 w-3.5 text-primary" /> {t.subtotal}
                </div>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {selectedCurrency.symbol}{subtotal.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:from-card dark:to-amber-500/10">
                <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                  <PiggyBank className="h-3.5 w-3.5 text-amber-500" /> {t.reserveAmount} ({reserve}%)
                </div>
                <p className="mt-2 text-lg font-semibold text-amber-600">
                  {selectedCurrency.symbol}{reserveAmount.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
                <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary">
                  <DollarSign className="h-3.5 w-3.5" /> {t.total}
                </div>
                <p className="mt-2 text-2xl font-bold text-primary">
                  {selectedCurrency.symbol}{total.toLocaleString("en-US")}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-2xl border-primary/40 bg-background/80"
                onClick={handlePrint}
              >
                Save as PDF (Print)
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-2xl border-primary/40 bg-background/80"
                onClick={handleShareSummary}
              >
                Share summary
              </Button>
            </div>
          </>
        )}
      </div>

      {/* 🧾 Print / PDF version with only the budget summary */}
      {total !== null && (
        <div className="print-only mt-6 rounded-2xl border border-black/80 bg-white p-6 text-sm text-black">
          <h2 className="text-xl font-bold mb-2">Renovation budget</h2>
          <p className="mb-1">
            <strong>Currency:</strong> {selectedCurrency.symbol} ({selectedCurrency.code})
          </p>
          <p className="mb-1">
            <strong>Subtotal:</strong> {selectedCurrency.symbol}
            {subtotal.toLocaleString("en-US")}
          </p>
          <p className="mb-1">
            <strong>Reserve:</strong> {reserve}% ({selectedCurrency.symbol}
            {reserveAmount.toLocaleString("en-US")})
          </p>
          <p className="mb-3">
            <strong>Total:</strong> {selectedCurrency.symbol}
            {total.toLocaleString("en-US")}
          </p>
          <hr className="my-3" />
          <h3 className="font-semibold mb-2">Cost categories</h3>
          <ul className="space-y-1">
            {items
              .filter((item) => item.category && item.cost)
              .map((item) => {
                const cost = parseFloat(item.cost.replace(",", ".")) || 0
                return (
                  <li key={item.id} className="flex justify-between gap-4">
                    <span>{item.category}</span>
                    <span>
                      {selectedCurrency.symbol}
                      {cost.toLocaleString("en-US")}
                    </span>
                  </li>
                )
              })}
          </ul>
        </div>
      )}
    </div>
  )
}
