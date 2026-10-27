"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Star, ShieldCheck, FileText, WifiOff, ArrowUpRight } from "lucide-react"

const PLAY_STORE_URL =
    "https://play.google.com/store/apps/details?id=com.renohacks.floorcalcpro&pcampaignid=web_share"

interface FloorCalcAppBannerProps {
    variant?: "card" | "compact" | "minimal"
    lang?: "ru" | "en"
    className?: string
}

export function FloorCalcAppBanner({
    variant = "card",
    lang,
    className = "",
}: FloorCalcAppBannerProps) {
    const pathname = usePathname()
    const isEn = lang ? lang === "en" : !pathname?.startsWith("/ru")

    const content = isEn
        ? {
              badge: "Official Android App",
              title: "FloorCalc Pro: Tile & Flooring",
              subtitle:
                  "Precision calculations for tile, laminate, screed & grout. Generate contractor-grade PDF estimates directly on the job site.",
              features: [
                  { icon: WifiOff, label: "100% Offline" },
                  { icon: FileText, label: "Instant PDF Estimates" },
                  { icon: ShieldCheck, label: "Zero Data Tracking" },
              ],
              ctaTitle: "Get it on",
              ctaStore: "Google Play",
              rating: "5.0 Rating • Free Download",
          }
        : {
              badge: "Официальное приложение",
              title: "FloorCalc Pro: Полы и Плитка",
              subtitle:
                  "Инженерный расчёт плитки, ламината, стяжки и клея. Создавайте чистые PDF-сметы для заказчиков прямо на объекте без интернета.",
              features: [
                  { icon: WifiOff, label: "100% Офлайн" },
                  { icon: FileText, label: "Готовые PDF-сметы" },
                  { icon: ShieldCheck, label: "Без сбора данных" },
              ],
              ctaTitle: "Доступно в",
              ctaStore: "Google Play",
              rating: "Оценка 5.0 • Бесплатно",
          }

    if (variant === "compact") {
        return (
            <aside
                aria-label="FloorCalc Pro Google Play"
                className={`relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-background to-amber-500/5 p-4 sm:p-5 shadow-lg backdrop-blur-md transition-all hover:border-amber-500/50 ${className}`}
            >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-md">
                            <Image
                                src="/images/apps/floorcalc-pro-icon.png"
                                alt="FloorCalc Pro App Icon"
                                width={56}
                                height={56}
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                                    <Star className="h-3 w-3 fill-amber-500" />
                                    {content.rating}
                                </span>
                            </div>
                            <h4 className="font-bold text-foreground text-sm sm:text-base">
                                {content.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                                {content.subtitle}
                            </p>
                        </div>
                    </div>

                    <Link
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-foreground px-4 py-2.5 text-xs font-semibold text-background shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98]"
                    >
                        <GooglePlayLogo className="h-4 w-4" />
                        <div className="text-left leading-none">
                            <div className="text-[9px] uppercase tracking-wider opacity-80">
                                {content.ctaTitle}
                            </div>
                            <div className="text-xs font-bold">{content.ctaStore}</div>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                    </Link>
                </div>
            </aside>
        )
    }

    return (
        <aside
            aria-label="FloorCalc Pro App Showcase"
            className={`group relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-500/10 p-6 sm:p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/10 ${className}`}
        >
            {/* Ambient Background Glow */}
            <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-60"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl opacity-50"
                aria-hidden
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left: App Icon & Copy */}
                <div className="flex items-start gap-4 sm:gap-5">
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl shadow-amber-500/20 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/images/apps/floorcalc-pro-icon.png"
                            alt="FloorCalc Pro Android App"
                            width={96}
                            height={96}
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-500">
                                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                {content.badge}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium">
                                ★ 5.0 Google Play
                            </span>
                        </div>

                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
                            {content.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                            {content.subtitle}
                        </p>

                        {/* Feature Badges */}
                        <div className="pt-2 flex flex-wrap gap-2">
                            {content.features.map((feat) => {
                                const Icon = feat.icon
                                return (
                                    <span
                                        key={feat.label}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground/90 backdrop-blur-xs"
                                    >
                                        <Icon className="h-3 w-3 text-amber-500" />
                                        {feat.label}
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Google Play Button */}
                <div className="w-full md:w-auto shrink-0 pt-2 md:pt-0">
                    <Link
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 rounded-2xl bg-foreground px-6 py-3.5 text-background shadow-lg shadow-black/20 transition-all duration-200 hover:scale-105 hover:bg-foreground/90 active:scale-[0.98] w-full md:w-auto"
                    >
                        <GooglePlayLogo className="h-6 w-6 shrink-0" />
                        <div className="text-left">
                            <div className="text-[10px] uppercase tracking-wider opacity-75 leading-none">
                                {content.ctaTitle}
                            </div>
                            <div className="text-base font-bold leading-tight">
                                {content.ctaStore}
                            </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 opacity-70 ml-1" />
                    </Link>
                </div>
            </div>
        </aside>
    )
}

function GooglePlayLogo({ className = "h-5 w-5" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.6 1.8c-.3.3-.5.8-.5 1.4v17.6c0 .6.2 1.1.5 1.4l.1.1 9.9-9.9v-.2L3.7 1.7l-.1.1z"
                fill="#00E676"
            />
            <path
                d="M16.9 15.5l-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.2l-3.9 2.2-.1.1z"
                fill="#FFD600"
            />
            <path
                d="M13.6 12.1L3.6 22.1c.4.4 1 .4 1.7 0l11.6-6.6-3.3-3.4z"
                fill="#FF3D00"
            />
            <path
                d="M13.6 11.9l3.3-3.4L5.3 1.9C4.6 1.5 4 1.5 3.6 1.9l10 10z"
                fill="#00B0FF"
            />
        </svg>
    )
}
