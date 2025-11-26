export interface PaintParams {
  length: number
  width: number
  height: number
  doors: number
  windows: number
  layers: number
  coverage: number
}

// Литры краски по той же формуле, что в виджете
export function computePaintLiters(params: PaintParams): number {
  const { length, width, height, doors, windows, layers, coverage } = params

  if (coverage <= 0) return 0
  if (length <= 0 || width <= 0 || height <= 0 || layers <= 0) return 0

  const d = doors * 2
  const win = windows * 1.5
  const area = (2 * height * (length + width) - (d + win)) * layers
  if (area <= 0) return 0

  const liters = area / coverage
  return Number.isFinite(liters) && liters > 0 ? liters : 0
}

export interface BudgetParams {
  items: number[]
  reservePercent: number
}

export interface BudgetResult {
  subtotal: number
  reserveAmount: number
  total: number
}

// Смета: сумма, резерв и итог
export function computeBudget(params: BudgetParams): BudgetResult {
  const { items, reservePercent } = params

  const safeItems = items.map((raw) => {
    if (!Number.isFinite(raw) || raw < 0) return 0
    if (raw > 1_000_000_000) return 0
    return raw
  })

  const subtotal = safeItems.reduce((sum, v) => sum + v, 0)

  if (!Number.isFinite(reservePercent) || reservePercent < 0 || reservePercent > 100) {
    return { subtotal, reserveAmount: 0, total: subtotal }
  }

  const reserveAmount = subtotal * (reservePercent / 100)
  const total = subtotal + reserveAmount

  return { subtotal, reserveAmount, total }
}

export type SurfaceType = "floor" | "wall"
export type LayoutType = "straight" | "diagonal" | "herringbone" | "brick"

export interface TileParams {
  surfaceType: SurfaceType
  length: number
  width: number
  bathArea: number
  tileLength: number
  tileWidth: number
  groutWidth: number
  tilesPerPack: number
  windows: number
  doors: number
  windowArea: number
  doorArea: number
  baseWastePercent: number
  additionalWastePercent: number
}

export interface TileResult {
  tilesNeeded: number
  packsNeeded: number
  tileArea: number
  glueAmountKg: number
}

// Плитка: количество плиток, упаковок и клея
export function computeTile(params: TileParams): TileResult | null {
  const {
    surfaceType,
    length,
    width,
    bathArea,
    tileLength,
    tileWidth,
    groutWidth,
    tilesPerPack,
    windows,
    doors,
    windowArea,
    doorArea,
    baseWastePercent,
    additionalWastePercent,
  } = params

  if (length <= 0 || width <= 0 || tileLength <= 0 || tileWidth <= 0) return null
  if (groutWidth < 0 || groutWidth > 20) return null
  if (tilesPerPack <= 0) return null

  if (length > 100 || width > 100 || tileLength > 200 || tileWidth > 200) return null

  let surfaceArea = length * width

  if (surfaceType === "floor" && bathArea > 0) {
    surfaceArea = Math.max(0, surfaceArea - bathArea)
  }

  let totalArea = surfaceArea
  if (surfaceType === "wall") {
    const windowsTotal = windows * (windowArea > 0 ? windowArea : 2)
    const doorsTotal = doors * (doorArea > 0 ? doorArea : 2)
    totalArea = Math.max(0, surfaceArea - windowsTotal - doorsTotal)
  }

  const tileAreaM2 = (tileLength / 100) * (tileWidth / 100)
  const groutM = groutWidth / 1000
  const effectiveTileArea =
    tileAreaM2 - (groutM * (tileLength / 100 + tileWidth / 100) - groutM * groutM)

  const baseArea = Math.max(effectiveTileArea, tileAreaM2 * 0.95)
  if (baseArea <= 0) return null

  const tilesWithoutWaste = totalArea / baseArea

  const totalWaste = baseWastePercent + additionalWastePercent
  const tilesWithWaste = Math.ceil(tilesWithoutWaste * (1 + totalWaste / 100))
  const packs = Math.ceil(tilesWithWaste / tilesPerPack)

  const gluePerSquareMeter = 4.5
  const glueNeeded = Math.ceil(totalArea * gluePerSquareMeter)

  if (!Number.isFinite(tilesWithWaste) || !Number.isFinite(packs) || !Number.isFinite(glueNeeded)) {
    return null
  }

  return {
    tilesNeeded: tilesWithWaste,
    packsNeeded: packs,
    tileArea: tileAreaM2,
    glueAmountKg: glueNeeded,
  }
}

export type WallpaperCalculationType = "room" | "walls"

export interface WallpaperParams {
  calculationType: WallpaperCalculationType
  roomWidth: number
  roomLength: number
  roomHeight: number
  wallLength: number
  wallHeight: number
  windows: { width: number; height: number }[]
  doors: { width: number; height: number }[]
  rollWidthCm: number
  rollLengthM: number
  patternRepeatCm: number
  patternOffset: boolean
}

export interface WallpaperResult {
  wallArea: number
  rollsNeeded: number
}

// Обои: чистая площадь стен и количество рулонов
export function computeWallpaper(params: WallpaperParams): WallpaperResult | null {
  const {
    calculationType,
    roomWidth,
    roomLength,
    roomHeight,
    wallLength,
    wallHeight,
    windows,
    doors,
    rollWidthCm,
    rollLengthM,
    patternRepeatCm,
    patternOffset,
  } = params

  let totalWallArea = 0

  if (calculationType === "room") {
    const width = roomWidth
    const length = roomLength
    const height = roomHeight

    if (
      width <= 0 ||
      length <= 0 ||
      height <= 0 ||
      width > 100 ||
      length > 100 ||
      height > 10
    ) {
      return null
    }

    const perimeter = 2 * (width + length)
    totalWallArea = perimeter * height
  } else {
    const length = wallLength
    const height = wallHeight

    if (length <= 0 || height <= 0 || length > 100 || height > 10) {
      return null
    }

    totalWallArea = length * height
  }

  const windowsArea = windows.reduce((sum, w) => {
    if (w.width > 0 && w.height > 0) return sum + w.width * w.height
    return sum
  }, 0)

  const doorsArea = doors.reduce((sum, d) => {
    if (d.width > 0 && d.height > 0) return sum + d.width * d.height
    return sum
  }, 0)

  const netWallArea = Math.max(0, totalWallArea - windowsArea - doorsArea)

  const rollW = rollWidthCm / 100
  const rollL = rollLengthM
  const patternR = patternRepeatCm / 100

  if (rollW <= 0 || rollL <= 0 || rollW > 5 || rollL > 50) return null

  const refHeight = calculationType === "room" ? roomHeight : wallHeight || 2.7
  let stripsPerRoll = Math.floor(rollL / refHeight)

  if (patternR > 0) {
    const usableLength = rollL - patternR
    stripsPerRoll = Math.floor(usableLength / (refHeight + patternR))
    if (patternOffset) {
      stripsPerRoll = Math.floor(usableLength / (refHeight + patternR * 0.5))
    }
  }

  if (stripsPerRoll <= 0) stripsPerRoll = 1

  let perimeter = 0
  if (calculationType === "room") {
    perimeter = 2 * (roomWidth + roomLength)
  } else {
    perimeter = wallLength * 2
  }

  const stripsNeeded = Math.ceil(perimeter / rollW)
  const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll) + 1

  if (!Number.isFinite(rollsNeeded)) return null

  return { wallArea: netWallArea, rollsNeeded }
}


