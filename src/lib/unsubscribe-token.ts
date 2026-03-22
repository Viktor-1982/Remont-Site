import { createHmac } from "node:crypto"
import { getConfiguredSecret, safeEqual } from "@/lib/request-auth"

type Locale = "ru" | "en"

type TokenPayload = {
    email: string
    locale: Locale
    exp: number
    v: 1
}

const DEFAULT_TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 365
const SECRET_ENV_NAMES = [
    "UNSUBSCRIBE_SECRET",
    "NOTIFY_SECRET",
    "CRON_SECRET",
    "ADMIN_API_SECRET",
] as const

function getSecret(): string | null {
    return getConfiguredSecret(SECRET_ENV_NAMES)
}

function signPayload(encodedPayload: string, secret: string): string {
    return createHmac("sha256", secret).update(encodedPayload).digest("base64url")
}

export function createUnsubscribeToken(
    email: string,
    locale: Locale,
    expiresAt = Date.now() + DEFAULT_TOKEN_TTL_MS
): string | null {
    const secret = getSecret()

    if (!secret) {
        return null
    }

    const payload: TokenPayload = {
        email: email.toLowerCase(),
        locale,
        exp: expiresAt,
        v: 1,
    }

    const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString(
        "base64url"
    )
    const signature = signPayload(encodedPayload, secret)

    return `${encodedPayload}.${signature}`
}

export function buildUnsubscribeUrl(
    siteUrl: string,
    email: string,
    locale: Locale
): string | null {
    const token = createUnsubscribeToken(email, locale)

    if (!token) {
        return null
    }

    const baseUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl
    return `${baseUrl}/api/unsubscribe?token=${encodeURIComponent(token)}`
}

export function verifyUnsubscribeToken(token: string | null | undefined):
    | { valid: true; email: string; locale: Locale }
    | { valid: false; reason: string } {
    if (!token) {
        return { valid: false, reason: "Missing token" }
    }

    const secret = getSecret()

    if (!secret) {
        return { valid: false, reason: "Unsubscribe token secret is not configured" }
    }

    const [encodedPayload, signature] = token.split(".")

    if (!encodedPayload || !signature) {
        return { valid: false, reason: "Malformed token" }
    }

    const expectedSignature = signPayload(encodedPayload, secret)

    if (!safeEqual(signature, expectedSignature)) {
        return { valid: false, reason: "Invalid token signature" }
    }

    try {
        const rawPayload = Buffer.from(encodedPayload, "base64url").toString("utf8")
        const payload = JSON.parse(rawPayload) as Partial<TokenPayload>

        if (payload.v !== 1) {
            return { valid: false, reason: "Unsupported token version" }
        }

        if (typeof payload.email !== "string" || !payload.email) {
            return { valid: false, reason: "Token email is missing" }
        }

        if (payload.locale !== "ru" && payload.locale !== "en") {
            return { valid: false, reason: "Token locale is invalid" }
        }

        if (typeof payload.exp !== "number" || !Number.isFinite(payload.exp)) {
            return { valid: false, reason: "Token expiry is invalid" }
        }

        if (payload.exp < Date.now()) {
            return { valid: false, reason: "Token has expired" }
        }

        return {
            valid: true,
            email: payload.email.toLowerCase(),
            locale: payload.locale,
        }
    } catch {
        return { valid: false, reason: "Token payload is invalid" }
    }
}
