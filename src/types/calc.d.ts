export type Locale = "ru" | "en"

export interface PaintCalcDict {
    title: string
    length: string
    width: string
    height: string
    doors: string
    windows: string
    layers: string
    coverage: string
    result: string
}

export interface TilesCalcDict {
    title: string
    inputLabel: string
    tileSize: string
    result: string
}

export interface WallpaperCalcDict {
    title: string
    inputLabel: string
    rollCoverage: string
    result: string
}

export interface BudgetCalcDict {
    title: string
    area: string
    type: string
    cosmetic: string
    standard: string
    premium: string
    result: string
    materials: string
    work: string
    total: string
}

export interface ButtonsDict {
    calculate: string
}

export interface CalcDict {
    paint: PaintCalcDict
    tiles: TilesCalcDict
    wallpaper: WallpaperCalcDict
    budget: BudgetCalcDict
    buttons: ButtonsDict
}

export type CalcData = {
    [key in Locale]: {
        calc: CalcDict
    }
}
