import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "ru"]
const defaultLocale = "en"

function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get("accept-language")
    if (acceptLanguage) {
        if (acceptLanguage.toLowerCase().includes("ru")) {
            return "ru"
        }
    }
    return defaultLocale
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Exclude static assets, internal paths, API, sitemaps, RSS, etc.
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/images") ||
        pathname.startsWith("/drafts") ||
        pathname.includes(".") ||
        pathname === "/sitemap.xml" ||
        pathname === "/robots.txt" ||
        pathname === "/manifest.json"
    ) {
        return NextResponse.next()
    }

    // Check if the pathname already has a locale prefix
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        return NextResponse.next()
    }

    // Redirect to default/detected locale
    const locale = getLocale(request)
    const redirectUrl = new URL(
        `/${locale}${pathname === "/" ? "" : pathname}`,
        request.url
    )
    redirectUrl.search = request.nextUrl.search

    return NextResponse.redirect(redirectUrl, 308)
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|manifest.json|robots.txt|sitemap.xml|sw.js).*)"],
}
