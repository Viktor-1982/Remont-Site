"use client"

import * as React from "react"
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from "next-themes"

/**
 * ThemeProvider — обёртка для next-themes.
 * Добавлены кастомные темы (sepia, contrast).
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            value={{
                light: "light",
                dark: "dark",
                sepia: "sepia",
                contrast: "contrast", // 
            }}
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}
