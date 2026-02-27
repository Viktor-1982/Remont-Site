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

export interface UnderfloorCalcDict {
    title: string
    area: string
    coverage: string
    floorType: string
    systemType: string
    mode: string
    heatLoss: string
    belowFloor: string
    cablePower: string
    matPower: string
    hours: string
    days: string
    load: string
    tariff: string
    peakLoad: string
    result: string
}

export interface ButtonsDict {
    calculate: string
}

export interface BudgetCalcDict {
    title: string
    category: string
    cost: string
    addCategory: string
    remove: string
    reserve: string
    currency: string
    selectCurrency: string
    calculate: string
    subtotal: string
    reserveAmount: string
    total: string
}

export interface VentilationCalcDict {
    title: string
    length: string
    width: string
    height: string
    roomType: string
    ach: string
    reserve: string
    volume: string
    airflow: string
    withReserve: string
    instruction: string
    calculate: string
}

export interface LightingCalcDict {
    title: string
    length: string
    width: string
    roomType: string
    lux: string
    lumenPerLamp: string
    reserve: string
    area: string
    totalLumens: string
    lamps: string
    instruction: string
    calculate: string
    shareCalculator: string
    shareResult: string
    saveResult: string
}

export interface CalcDict {
    paint: PaintCalcDict
    tiles: TilesCalcDict
    wallpaper: WallpaperCalcDict
    underfloor: UnderfloorCalcDict
    buttons: ButtonsDict
    budget: BudgetCalcDict
    ventilation: VentilationCalcDict
    lighting: LightingCalcDict
}

export type CalcData = {
    [key in Locale]: {
        calc: CalcDict
    }
}
