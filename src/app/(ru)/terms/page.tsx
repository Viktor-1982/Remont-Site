import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CheckCircle, XCircle, Shield, Scale, Mail, Home, Heart, Lightbulb, Users } from "lucide-react"
import Script from "next/script"

export const metadata = getPageMetadata("/terms", {
  title: "РџСЂР°РІРёР»Р° РїРѕР»СЊР·РѕРІР°РЅРёСЏ СЃР°Р№С‚РѕРј | Renohacks",
  description: "РџСЂР°РІРёР»Р° Рё СѓСЃР»РѕРІРёСЏ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ СЃР°Р№С‚Р° Renohacks.com. РРЅС„РѕСЂРјР°С†РёСЏ Рѕ С‚РѕРј, С‡С‚Рѕ РјРѕР¶РЅРѕ Рё РЅРµР»СЊР·СЏ РґРµР»Р°С‚СЊ РЅР° СЃР°Р№С‚Рµ, РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚СЊ Рё РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ.",
  cover: "/images/og-default.png",
  type: "article",
})

const baseUrl = "https://renohacks.com"

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Р“Р»Р°РІРЅР°СЏ",
      item: `${baseUrl}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "РџСЂР°РІРёР»Р° РїРѕР»СЊР·РѕРІР°РЅРёСЏ",
      item: `${baseUrl}/terms`,
    },
  ],
}

export default function TermsOfUsePage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-5xl">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 mb-6">
          <FileText className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          РџСЂР°РІРёР»Р° РїРѕР»СЊР·РѕРІР°РЅРёСЏ СЃР°Р№С‚РѕРј
        </h1>
        <p className="text-muted-foreground text-lg">РЈСЃР»РѕРІРёСЏ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ Renohacks.com</p>
      </div>

      <div className="space-y-8">
        {/* Рћ СЃР°Р№С‚Рµ */}
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 dark:to-primary/10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Рћ СЃР°Р№С‚Рµ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-muted-foreground leading-relaxed text-base">
              <strong className="text-foreground">Renohacks.com</strong> вЂ” СЌС‚Рѕ Р±Р»РѕРі Рѕ СЂРµРјРѕРЅС‚Рµ, РґРёР·Р°Р№РЅРµ РёРЅС‚РµСЂСЊРµСЂР° Рё DIY РїСЂРѕРµРєС‚Р°С…. 
              РњС‹ РїСЂРµРґРѕСЃС‚Р°РІР»СЏРµРј РїСЂР°РєС‚РёС‡РµСЃРєРёРµ СЃРѕРІРµС‚С‹, РїРѕС€Р°РіРѕРІС‹Рµ СЂСѓРєРѕРІРѕРґСЃС‚РІР°, РєР°Р»СЊРєСѓР»СЏС‚РѕСЂС‹ Рё РІРґРѕС…РЅРѕРІРµРЅРёРµ РґР»СЏ СЃРѕР·РґР°РЅРёСЏ СѓСЋС‚РЅРѕРіРѕ РґРѕРјР°.
            </p>
          </CardContent>
        </Card>

        {/* Р§С‚Рѕ РјРѕР¶РЅРѕ РґРµР»Р°С‚СЊ */}
        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-card to-green-500/5 dark:to-green-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Р§С‚Рѕ РјРѕР¶РЅРѕ РґРµР»Р°С‚СЊ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">рџ“–</span>
                РСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ РєРѕРЅС‚РµРЅС‚Р°
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Р§РёС‚Р°С‚СЊ СЃС‚Р°С‚СЊРё</strong> Рё СЂСѓРєРѕРІРѕРґСЃС‚РІР° РґР»СЏ Р»РёС‡РЅРѕРіРѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂС‹</strong> РґР»СЏ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЏ СЂРµРјРѕРЅС‚Р°</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РЎРѕС…СЂР°РЅСЏС‚СЊ СЃСЃС‹Р»РєРё</strong> РЅР° РёРЅС‚РµСЂРµСЃРЅС‹Рµ РјР°С‚РµСЂРёР°Р»С‹</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Р”РµР»РёС‚СЊСЃСЏ СЃСЃС‹Р»РєР°РјРё</strong> РЅР° СЃС‚Р°С‚СЊРё РІ СЃРѕС†РёР°Р»СЊРЅС‹С… СЃРµС‚СЏС…</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />

                  <span><strong className="text-foreground">РџРµС‡Р°С‚Р°С‚СЊ СЃС‚Р°С‚СЊРё</strong> РґР»СЏ Р»РёС‡РЅРѕРіРѕ РёСЃРїРѕР»СЊР·РѕРІР°РЅРёСЏ</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">рџ’¬</span>
                Р’Р·Р°РёРјРѕРґРµР№СЃС‚РІРёРµ
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Задавать вопросы</strong> по email</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РџСЂРµРґР»Р°РіР°С‚СЊ С‚РµРјС‹</strong> РґР»СЏ РЅРѕРІС‹С… СЃС‚Р°С‚РµР№</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РЎРѕРѕР±С‰Р°С‚СЊ РѕР± РѕС€РёР±РєР°С…</strong> РІ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂР°С… РёР»Рё СЃС‚Р°С‚СЊСЏС…</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Р”РµР»РёС‚СЊСЃСЏ РѕРїС‹С‚РѕРј</strong> СЂРµРјРѕРЅС‚Р° (С‡РµСЂРµР· РєРѕРЅС‚Р°РєС‚С‹)</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Р§С‚Рѕ Р·Р°РїСЂРµС‰РµРЅРѕ */}
        <Card className="border-2 border-red-500/20 bg-gradient-to-br from-card to-red-500/5 dark:to-red-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center shadow-lg">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Р§С‚Рѕ Р·Р°РїСЂРµС‰РµРЅРѕ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">рџљ« РљРѕРїРёСЂРѕРІР°РЅРёРµ РєРѕРЅС‚РµРЅС‚Р°</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РљРѕРїРёСЂРѕРІР°С‚СЊ СЃС‚Р°С‚СЊРё</strong> РїРѕР»РЅРѕСЃС‚СЊСЋ РёР»Рё С‡Р°СЃС‚РёС‡РЅРѕ Р±РµР· СЂР°Р·СЂРµС€РµРЅРёСЏ</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РёР·РѕР±СЂР°Р¶РµРЅРёСЏ</strong> РІ РєРѕРјРјРµСЂС‡РµСЃРєРёС… С†РµР»СЏС…</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РџРµСЂРµРІРѕРґРёС‚СЊ РєРѕРЅС‚РµРЅС‚</strong> Р±РµР· СЃРѕРіР»Р°СЃРѕРІР°РЅРёСЏ</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РЎРѕР·РґР°РІР°С‚СЊ РїСЂРѕРёР·РІРѕРґРЅС‹Рµ СЂР°Р±РѕС‚С‹</strong> РЅР° РѕСЃРЅРѕРІРµ РЅР°С€РёС… РјР°С‚РµСЂРёР°Р»РѕРІ</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">рџљ« РўРµС…РЅРёС‡РµСЃРєРёРµ РѕРіСЂР°РЅРёС‡РµРЅРёСЏ</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Р’Р·Р»Р°РјС‹РІР°С‚СЊ СЃР°Р№С‚</strong> РёР»Рё РїС‹С‚Р°С‚СЊСЃСЏ РїРѕР»СѓС‡РёС‚СЊ РЅРµСЃР°РЅРєС†РёРѕРЅРёСЂРѕРІР°РЅРЅС‹Р№ РґРѕСЃС‚СѓРї</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РСЃРїРѕР»СЊР·РѕРІР°С‚СЊ Р°РІС‚РѕРјР°С‚РёР·РёСЂРѕРІР°РЅРЅС‹Рµ СЃРєСЂРёРїС‚С‹</strong> РґР»СЏ СЃР±РѕСЂР° РґР°РЅРЅС‹С…</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">РџРµСЂРµРіСЂСѓР¶Р°С‚СЊ СЃРµСЂРІРµСЂ</strong> РјРЅРѕР¶РµСЃС‚РІРµРЅРЅС‹РјРё Р·Р°РїСЂРѕСЃР°РјРё</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                  <span><strong className="text-foreground">Р Р°СЃРїСЂРѕСЃС‚СЂР°РЅСЏС‚СЊ РІСЂРµРґРѕРЅРѕСЃРЅРѕРµ РџРћ</strong> С‡РµСЂРµР· РЅР°С€ СЃР°Р№С‚</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* РљРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚СЊ */}
        <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5 dark:to-blue-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold">РљРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚СЊ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3">рџ“Љ РЎР±РѕСЂ РґР°РЅРЅС‹С…</h3>
              <p className="text-muted-foreground mb-3">РњС‹ СЃРѕР±РёСЂР°РµРј С‚РѕР»СЊРєРѕ РЅРµРѕР±С…РѕРґРёРјС‹Рµ РґР°РЅРЅС‹Рµ:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РђРЅР°Р»РёС‚РёРєР° РїРѕСЃРµС‰РµРЅРёР№</strong> (Р°РЅРѕРЅРёРјРЅР°СЏ СЃС‚Р°С‚РёСЃС‚РёРєР°)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РљРѕРЅС‚Р°РєС‚РЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ</strong> (С‚РѕР»СЊРєРѕ РїСЂРё РѕР±СЂР°С‰РµРЅРёРё)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">Cookies</strong> РґР»СЏ СѓР»СѓС‡С€РµРЅРёСЏ СЂР°Р±РѕС‚С‹ СЃР°Р№С‚Р°</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                РџРѕРґСЂРѕР±РЅРµРµ Рѕ РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё С‡РёС‚Р°Р№С‚Рµ РІ РЅР°С€РµР№{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">РџРѕР»РёС‚РёРєРµ РєРѕРЅС„РёРґРµРЅС†РёР°Р»СЊРЅРѕСЃС‚Рё</Link>.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* РћС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ */}
        <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-card to-orange-500/5 dark:to-orange-500/10 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-2xl font-bold">РћС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-3">рџЏ—пёЏ РРЅС„РѕСЂРјР°С†РёСЏ Рѕ СЂРµРјРѕРЅС‚Рµ</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РЎРѕРІРµС‚С‹ РЅРѕСЃСЏС‚ СЂРµРєРѕРјРµРЅРґР°С‚РµР»СЊРЅС‹Р№ С…Р°СЂР°РєС‚РµСЂ</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РЅРµСЃРµС‚ РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ</strong> Р·Р° СЃРІРѕРё РґРµР№СЃС‚РІРёСЏ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">Р РµРєРѕРјРµРЅРґСѓРµРј РєРѕРЅСЃСѓР»СЊС‚РёСЂРѕРІР°С‚СЊСЃСЏ</strong> СЃ РїСЂРѕС„РµСЃСЃРёРѕРЅР°Р»Р°РјРё</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РњС‹ РЅРµ РЅРµСЃРµРј РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚Рё</strong> Р·Р° СѓС‰РµСЂР± РѕС‚ РїСЂРёРјРµРЅРµРЅРёСЏ СЃРѕРІРµС‚РѕРІ</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">рџ”§ РљР°Р»СЊРєСѓР»СЏС‚РѕСЂС‹</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">Р РµР·СѓР»СЊС‚Р°С‚С‹ РїСЂРёР±Р»РёР·РёС‚РµР»СЊРЅС‹Рµ</strong> Рё РґР»СЏ РїР»Р°РЅРёСЂРѕРІР°РЅРёСЏ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">Р¤Р°РєС‚РёС‡РµСЃРєРёРµ С†РµРЅС‹ РјРѕРіСѓС‚ РѕС‚Р»РёС‡Р°С‚СЊСЃСЏ</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РЈС‡РёС‚С‹РІР°Р№С‚Рµ СЂРµРіРёРѕРЅР°Р»СЊРЅС‹Рµ РѕСЃРѕР±РµРЅРЅРѕСЃС‚Рё</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РџСЂРѕРІРµСЂСЏР№С‚Рµ Р°РєС‚СѓР°Р»СЊРЅРѕСЃС‚СЊ С†РµРЅ</strong> СЃР°РјРѕСЃС‚РѕСЏС‚РµР»СЊРЅРѕ</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* РќР°С€Рё РїСЂРёРЅС†РёРїС‹ */}
        <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-card to-secondary/10 dark:to-secondary/20 shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">РќР°С€Рё РїСЂРёРЅС†РёРїС‹</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                РњРёСЃСЃРёСЏ
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                РњС‹ РїРѕРјРѕРіР°РµРј Р»СЋРґСЏРј СЃРѕР·РґР°РІР°С‚СЊ СѓСЋС‚РЅС‹Рµ Рё С„СѓРЅРєС†РёРѕРЅР°Р»СЊРЅС‹Рµ РґРѕРјР°, РїСЂРµРґРѕСЃС‚Р°РІР»СЏСЏ РїСЂР°РєС‚РёС‡РµСЃРєРёРµ СЃРѕРІРµС‚С‹ Рё РІРґРѕС…РЅРѕРІРµРЅРёРµ РґР»СЏ СЂРµРјРѕРЅС‚Р° Рё РґРёР·Р°Р№РЅР°.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Р¦РµРЅРЅРѕСЃС‚Рё
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РџСЂР°РєС‚РёС‡РЅРѕСЃС‚СЊ</strong> вЂ” С‚РѕР»СЊРєРѕ РїСЂРѕРІРµСЂРµРЅРЅС‹Рµ СЃРѕРІРµС‚С‹</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">Р”РѕСЃС‚СѓРїРЅРѕСЃС‚СЊ</strong> вЂ” РїРѕРЅСЏС‚РЅС‹Рµ РёРЅСЃС‚СЂСѓРєС†РёРё РґР»СЏ РІСЃРµС…</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">РљР°С‡РµСЃС‚РІРѕ</strong> вЂ” С‚С‰Р°С‚РµР»СЊРЅРѕ РѕС‚РѕР±СЂР°РЅРЅС‹Р№ РєРѕРЅС‚РµРЅС‚</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">вЂў</span>
                  <span><strong className="text-foreground">Р§РµСЃС‚РЅРѕСЃС‚СЊ</strong> вЂ” РїСЂРѕР·СЂР°С‡РЅРѕСЃС‚СЊ РІ СЂРµРєРѕРјРµРЅРґР°С†РёСЏС…</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* РљРѕРЅС‚Р°РєС‚С‹ */}
        <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/20 flex items-center justify-center shadow-lg ring-2 ring-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                РљРѕРЅС‚Р°РєС‚С‹
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Р•СЃР»Рё Сѓ РІР°СЃ РµСЃС‚СЊ РІРѕРїСЂРѕСЃС‹ Рѕ РїСЂР°РІРёР»Р°С… РїРѕР»СЊР·РѕРІР°РЅРёСЏ, СЃРІСЏР¶РёС‚РµСЃСЊ СЃ РЅР°РјРё:
            </p>
            <a
              href="mailto:info@renohacks.com"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <Mail className="w-5 h-5 group-hover:animate-bounce" />
              <span>info@renohacks.com</span>
            </a>
          </CardContent>
        </Card>

        {/* РљСЂР°С‚РєР°СЏ РїР°РјСЏС‚РєР° */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">рџ“‹ РљСЂР°С‚РєР°СЏ РїР°РјСЏС‚РєР°</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">РњРѕР¶РЅРѕ:</strong> С‡РёС‚Р°С‚СЊ, РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂС‹, РґРµР»РёС‚СЊСЃСЏ СЃСЃС‹Р»РєР°РјРё
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">РќРµР»СЊР·СЏ:</strong> РєРѕРїРёСЂРѕРІР°С‚СЊ РєРѕРЅС‚РµРЅС‚, РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РІ РєРѕРјРјРµСЂС‡РµСЃРєРёС… С†РµР»СЏС…
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Р‘РµР·РѕРїР°СЃРЅРѕ:</strong> РјС‹ Р·Р°С‰РёС‰Р°РµРј РІР°С€Рё РґР°РЅРЅС‹Рµ
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">РћС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ:</strong> РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РЅРµСЃРµС‚ РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚СЊ Р·Р° РїСЂРёРјРµРЅРµРЅРёРµ СЃРѕРІРµС‚РѕРІ
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">РЎРІСЏР·СЊ:</strong> info@renohacks.com РґР»СЏ Р»СЋР±С‹С… РІРѕРїСЂРѕСЃРѕРІ
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-lg font-medium text-primary mb-2">РЎРїР°СЃРёР±Рѕ Р·Р° РёСЃРїРѕР»СЊР·РѕРІР°РЅРёРµ Renohacks.com! рџЏ вњЁ</p>
          <p className="text-sm text-muted-foreground">РџРѕСЃР»РµРґРЅРµРµ РѕР±РЅРѕРІР»РµРЅРёРµ: 28 РѕРєС‚СЏР±СЂСЏ 2025 РіРѕРґР°</p>
        </div>
      </div>

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </main>
  )
}

