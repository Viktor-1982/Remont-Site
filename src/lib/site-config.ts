/**
 * Global site configuration
 */
export const SITE_CONFIG = {
    name: "Renohacks",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://renohacks.com",
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "vles8878@gmail.com",
} as const
