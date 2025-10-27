"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calculator, Plus, Trash2 } from "lucide-react"
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

  const [items, setItems] = useState<ExpenseItem[]>([{ id: Date.now(), category: "", cost: "" }])
  const [reserve, setReserve] = useState("20")
  const [currency, setCurrency] = useState("RUB")
  const [subtotal, setSubtotal] = useState<number>(0)
  const [reserveAmount, setReserveAmount] = useState<number>(0)
  const [total, setTotal] = useState<number | null>(null)

  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0]

  const addCategory = () => {
    setItems([...items, { id: Date.now(), category: "", cost: "" }])
  }

  const removeCategory = (id: number) => {
    setItems(items.filter((i) => i.id !== id))
  }

  const updateCategory = (id: number, field: keyof ExpenseItem, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculate = () => {
    const sum = items.reduce((acc, item) => {
      const cost = parseFloat(item.cost.replace(",", ".")) || 0
      return acc + cost
    }, 0)

    const reservePercent = parseFloat(reserve.replace(",", ".")) || 0
    const reserveValue = sum * (reservePercent / 100)
    const finalTotal = sum + reserveValue
    
    setSubtotal(sum)
    setReserveAmount(reserveValue)
    setTotal(finalTotal)
  }

  return (
    <div className="max-w-md mx-auto border rounded-lg p-4 shadow-sm space-y-4 bg-card">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        <Calculator className="w-5 h-5 text-primary" /> {t.title}
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                list={`categories-${item.id}`}
                placeholder={t.category}
                className="flex-1 border rounded-md px-3 py-2 text-sm"
                value={item.category}
                onChange={(e) => updateCategory(item.id, "category", e.target.value)}
              />
              <datalist id={`categories-${item.id}`}>
                {renovationCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
              <input
                type="number"
                placeholder={t.cost}
                className="w-32 border rounded-md px-3 py-2 text-sm text-right"
                value={item.cost}
                onChange={(e) => updateCategory(item.id, "cost", e.target.value)}
              />
              <Button variant="ghost" size="icon" onClick={() => removeCategory(item.id)} disabled={items.length === 1}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addCategory} className="w-full">
        <Plus className="w-4 h-4 mr-2" /> {t.addCategory}
      </Button>

      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium flex-1">{t.currency}</label>
        <select
          className="flex-1 border rounded-md px-3 py-2 text-sm bg-background"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.symbol} {curr.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium flex-1">{t.reserve}</label>
        <input
          type="number"
          className="w-24 border rounded-md px-3 py-2 text-sm text-right"
          value={reserve}
          onChange={(e) => setReserve(e.target.value)}
        />
      </div>

      <Button onClick={calculate} className="w-full" size="lg">
        {b.calculate}
      </Button>

      {total !== null && (
        <div className="mt-4 p-3 rounded-lg bg-muted">
          <p className="text-sm text-muted-foreground mb-2">
            {t.subtotal}: <b className="text-foreground">{subtotal.toLocaleString("ru-RU")} {selectedCurrency.symbol}</b>
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            {t.reserveAmount} ({reserve}%): <b className="text-amber-600">{reserveAmount.toLocaleString("ru-RU")} {selectedCurrency.symbol}</b>
          </p>
          <div className="pt-2 mt-2 border-t">
            <p className="text-lg font-bold text-primary">
              💰 {t.total}: {total.toLocaleString("ru-RU")} {selectedCurrency.symbol}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
