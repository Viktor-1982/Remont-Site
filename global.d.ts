// global.d.ts

// ✅ JSON
declare module "*.json" {
    const value: any
    export default value
}

// ✅ Изображения
declare module "*.png" {
    const value: string
    export default value
}

declare module "*.jpg" {
    const value: string
    export default value
}

declare module "*.jpeg" {
    const value: string
    export default value
}

declare module "*.gif" {
    const value: string
    export default value
}

declare module "*.svg" {
    import * as React from "react"
    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >
    export default ReactComponent
}

// ✅ Шрифты
declare module "*.woff"
declare module "*.woff2"
declare module "*.ttf"
declare module "*.eot"

// ✅ Видео / аудио
declare module "*.mp4"
declare module "*.webm"
declare module "*.mp3"

// ✅ GTM dataLayer
declare global {
    interface Window {
        dataLayer: Record<string, any>[]
    }
}

// 👇 важно оставить, чтобы TS понял, что это модуль
export {}
