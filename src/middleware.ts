import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// English is the PRIMARY language — canonical URLs have NO locale prefix.
// Russian pages use the /ru/ prefix.
// /en/* is kept for backward-compat and is rewritten to /* by next.config.ts.

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
    // English is served directly as the primary canonical language for global audience / SEO.
    // Russian content is accessed directly via /ru/* routes.
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico|manifest.json|robots.txt|sitemap.xml|sw.js).*)"],
}
