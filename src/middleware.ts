import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// English is the PRIMARY language — canonical URLs have NO locale prefix.
// Russian pages use the /ru/ prefix.
// /en/* is kept for backward-compat and is rewritten to /* by next.config.ts.

/** Returns true if the string contains at least one Cyrillic character */
function hasCyrillic(str: string): boolean {
    return /[а-яёА-ЯЁ]/.test(decodeURIComponent(str))
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

    // ── /en/* → pass through (next.config.ts redirects /en/* → /*) ──────────
    if (pathname.startsWith("/en/") || pathname === "/en") {
        return NextResponse.next()
    }

    // ── Cyrillic /tags/[slug] → redirect to /ru/tags/[slug] (301) ───────────
    // Fixes 404s caused by Russian-language tags ending up on the EN /tags/ path.
    // e.g. /tags/кухня → /ru/tags/кухня
    if (pathname.startsWith("/tags/") && hasCyrillic(pathname)) {
        const slug = pathname.slice("/tags/".length)
        const url = request.nextUrl.clone()
        url.pathname = `/ru/tags/${slug}`
        return NextResponse.redirect(url, { status: 301 })
    }

    // ── Bare paths (no locale prefix) = canonical EN URLs ───────────────────
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|manifest.json|robots.txt|sitemap.xml|sw.js).*)"],
}
