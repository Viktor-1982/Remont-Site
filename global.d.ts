export {}

declare global {
    interface Window {
        /**
         * Google Analytics (gtag.js)
         * https://developers.google.com/gtagjs/reference
         */
        gtag?: (
            command: "event",
            action: string,
            params?: Record<string, unknown>
        ) => void
        gtag?: (
            command: "config" | "js",
            targetId: string,
            params?: Record<string, unknown>
        ) => void

        /**
         * Google Tag Manager Data Layer
         * https://developers.google.com/tag-platform/tag-manager/web/datalayer
         */
        dataLayer?: Record<string, unknown>[]
    }
}
