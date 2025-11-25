"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calculator, Plus, Trash2, PiggyBank, Wallet, DollarSign } from "lucide-react"
import calcDataJson from "@/components/messages/calc.json"
import type { Locale, CalcData, BudgetCalcDict, ButtonsDict } from "@/types/calc"

const calcData = calcDataJson as CalcData

const renovationCategories = [
  "Демонтажные работы",
  "Черновая отделка",
  "Электрика",
  "Сантехника",
  "Отделка стен (штукатурка, шпаклёвка)",
  "Поклейка обоев",
  "Покраска стен",
  "Укладка плитки",
  "Натяжные потолки",
  "Покраска потолков",
  "Установка межкомнатных дверей",
  "Установка входной двери",
  "Укладка ламината",
  "Укладка паркета",
  "Укладка линолеума",
  "Установка плинтусов",
  "Установка окон (ПВХ)",
  "Установка окон (деревянные)",
  "Отделка балкона",
  "Установка кухни",
  "Отделка ванной комнаты",
  "Отделка туалета",
  "Установка душевой кабины",
  "Установка ванной",
  "Установка унитаза",
  "Установка смесителей",
  "Установка розеток и выключателей",
  "Установка счётчиков",
  "Укладка тёплого пола",
  "Шумоизоляция",
  "Утепление",
]

interface ExpenseItem {
  id: number
  category: string
  cost: string
}

const currencies = [
  { code: "RUB", symbol: "₽", name: "Рубль" },
  { code: "UAH", symbol: "₴", name: "Гривна" },
  { code: "KZT", symbol: "₸", name: "Тенге" },
]

export function RenovationBudgetPlanner() {
  const pathname = usePathname()
  const isEnglish = pathname.startsWith("/en")
  const locale: Locale = isEnglish ? "en" : "ru"

  const t: BudgetCalcDict = calcData[locale].calc.budget
  const b: ButtonsDict = calcData[locale].calc.buttons

  const [items, setItems] = useState<ExpenseItem[]>([{ id: 1, category: "", cost: "" }])
  const [reserve, setReserve] = useState("20")
  const [currency, setCurrency] = useState("RUB")
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
    // ✅ Ограничение длины для защиты от XSS и DoS
    const maxCategoryLength = 100
    const maxCostLength = 20
    const sanitizedValue = field === "category" 
      ? value.substring(0, maxCategoryLength)
      : field === "cost"
      ? value.substring(0, maxCostLength)
      : value
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: sanitizedValue } : item)))
  }

  const calculate = () => {
    // ✅ Валидация и санитизация входных данных
    const sum = items.reduce((acc, item) => {
      const cost = parseFloat(item.cost.replace(",", ".").replace(/[^0-9.-]/g, "")) || 0
      // Защита от отрицательных значений и слишком больших чисел
      if (cost < 0 || cost > 1000000000) return acc
      return acc + cost
    }, 0)

    const reservePercent = parseFloat(reserve.replace(",", ".").replace(/[^0-9.-]/g, "")) || 0
    // Защита от невалидного процента резерва
    if (isNaN(reservePercent) || !isFinite(reservePercent) || reservePercent < 0 || reservePercent > 100) {
      return
    }
    
    const reserveValue = sum * (reservePercent / 100)
    const finalTotal = sum + reserveValue
    
    // Проверка на разумность результата
    if (!isFinite(sum) || !isFinite(reserveValue) || !isFinite(finalTotal)) return
    
    setSubtotal(sum)
    setReserveAmount(reserveValue)
    setTotal(finalTotal)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-r from-primary/15 via-transparent to-accent/20 blur-3xl opacity-60" />
      <div className="relative space-y-6 rounded-[32px] border border-primary/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_45%),_var(--background)] p-6 md:p-8 shadow-[0_25px_80px_-35px_rgba(79,70,229,0.8)] transition">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Calculator className="h-3.5 w-3.5" /> Renohacks Pro Tool
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t.title}</h2>
          <p className="text-sm text-muted-foreground">
            Добавляйте категории расходов, фиксируйте стоимость и мгновенно видьте итоговую смету с резервом на непредвиденные работы.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
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
                    placeholder="Например, монтаж электрики"
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
                className="w-20 rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-center text-sm font-semibold transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
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
            <p className="mt-2 text-xs text-muted-foreground">Рекомендуем 20–25% для спокойного бюджета</p>
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
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-emerald-50/20 p-4 shadow-sm dark:from-card dark:to-emerald-500/10">
              <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                <Wallet className="h-3.5 w-3.5 text-primary" /> {t.subtotal}
              </div>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {subtotal.toLocaleString("ru-RU")} {selectedCurrency.symbol}
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-amber-50/20 p-4 shadow-sm dark:from-card dark:to-amber-500/10">
              <div className="flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                <PiggyBank className="h-3.5 w-3.5 text-amber-500" /> {t.reserveAmount} ({reserve}%)
              </div>
              <p className="mt-2 text-lg font-semibold text-amber-600">
                {reserveAmount.toLocaleString("ru-RU")} {selectedCurrency.symbol}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 p-4 shadow-md">
              <div className="flex items-center gap-2 text-xs font-medium uppercase text-primary">
                <DollarSign className="h-3.5 w-3.5" /> {t.total}
              </div>
              <p className="mt-2 text-2xl font-bold text-primary">
                {total.toLocaleString("ru-RU")} {selectedCurrency.symbol}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
