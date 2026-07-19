import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// English is the PRIMARY language — canonical URLs have NO locale prefix.
// Russian pages use the /ru/ prefix.
// /en/* is kept for backward-compat and is rewritten to /* by next.config.ts.

const defaultLocale = "en"

function getBrowserLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get("accept-language") ?? ""
    return acceptLanguage.toLowerCase().includes("ru") ? "ru" : defaultLocale
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // ── Skip static assets, API routes, and special files ──────────────────
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

    // ── /ru/* → always pass through (Russian pages are correctly prefixed) ──
    if (pathname.startsWith("/ru/") || pathname === "/ru") {
        return NextResponse.next()
    }

    // ── /en/* → pass through (next.config.ts rewrites /en/* → /*) ──────────
    if (pathname.startsWith("/en/") || pathname === "/en") {
        return NextResponse.next()
    }

    // ── Bare paths (no locale prefix) = canonical EN URLs ───────────────────
    // Priority:
    //   1. preferred-locale cookie — set by the language switcher (EXPLICIT user choice)
    //      This MUST take priority so the switcher works for Russian-browser users.
    //   2. Browser Accept-Language — used only for first-time visitors (no cookie)
    //   3. Default: EN (serve directly, no redirect)

    const cookieLocale = request.cookies.get("preferred-locale")?.value

    // If the user explicitly chose a language via the switcher, always respect it.
    // If no cookie, fall back to browser language for automatic detection.
    const locale = cookieLocale ?? getBrowserLocale(request)

    if (locale === "ru") {
        const redirectUrl = new URL(
            `/ru${pathname === "/" ? "" : pathname}`,
            request.url
        )
        redirectUrl.search = request.nextUrl.search
        // Use 307 (temporary) so Russian users on the English canonical can
        // still share/bookmark the EN URL without it being permanently cached.
        return NextResponse.redirect(redirectUrl, 307)
    }

    // English browser (or unknown) → serve the canonical EN path directly
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|manifest.json|robots.txt|sitemap.xml|sw.js).*)"],
}
