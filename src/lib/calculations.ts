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
  const wallArea = Math.max(0, 2 * height * (length + width) - (d + win))
  const ceilingArea = length * width
  const area = (wallArea + ceilingArea) * layers
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
    perimeter = wallLength
  }

  const stripsNeeded = Math.ceil(perimeter / rollW)
  const rollsNeeded = Math.ceil(stripsNeeded / stripsPerRoll)

  if (!Number.isFinite(rollsNeeded)) return null

  return { wallArea: netWallArea, rollsNeeded }
}

export type FloorCovering = "tile" | "laminate" | "wood" | "vinyl"
export type HeatingMode = "comfort" | "primary"
export type HeatingSystem = "cable" | "mat"

export interface UnderfloorHeatingParams {
  roomArea: number
  coveragePercent: number
  floorCovering: FloorCovering
  mode: HeatingMode
  system: HeatingSystem
  heatLossFactor: number
  belowFloorFactor: number
  cablePowerWPerM: number
  matPowerWPerM2: number
  hoursPerDay: number
  daysPerMonth: number
  loadPercent: number
  tariffPerKwh?: number
}

export interface UnderfloorHeatingResult {
  heatedArea: number
  recommendedPowerPerM2: number
  actualPowerPerM2: number
  totalPowerW: number
  cableLengthM?: number
  matAreaM2?: number
  monthlyKwh: number
  estimatedCost?: number
}

export interface VentilationParams {
  length: number
  width: number
  height: number
  airChangesPerHour: number
  reservePercent?: number
}

export interface VentilationResult {
  volumeM3: number
  flowM3h: number
  flowLs: number
  flowWithReserveM3h: number
}

const basePowerByCovering = (covering: FloorCovering, mode: HeatingMode): number => {
  if (mode === "primary") {
    switch (covering) {
      case "tile":
        return 180
      case "laminate":
      case "vinyl":
        return 160
      case "wood":
        return 140
    }
  }

  switch (covering) {
    case "tile":
      return 150
    case "laminate":
    case "vinyl":
      return 120
    case "wood":
      return 100
  }
}

export function computeUnderfloorHeating(
  params: UnderfloorHeatingParams,
): UnderfloorHeatingResult | null {
  const {
    roomArea,
    coveragePercent,
    floorCovering,
    mode,
    system,
    heatLossFactor,
    belowFloorFactor,
    cablePowerWPerM,
    matPowerWPerM2,
    hoursPerDay,
    daysPerMonth,
    loadPercent,
    tariffPerKwh,
  } = params

  if (roomArea <= 0 || roomArea > 1000) return null
  if (coveragePercent <= 0 || coveragePercent > 100) return null
  if (hoursPerDay < 0 || hoursPerDay > 24) return null
  if (daysPerMonth <= 0 || daysPerMonth > 31) return null
  if (loadPercent <= 0 || loadPercent > 100) return null
  if (heatLossFactor < 0.8 || heatLossFactor > 1.4) return null
  if (belowFloorFactor < 0.8 || belowFloorFactor > 1.4) return null

  const heatedArea = roomArea * (coveragePercent / 100)
  const recommendedPowerPerM2 =
    basePowerByCovering(floorCovering, mode) * heatLossFactor * belowFloorFactor

  let actualPowerPerM2 = recommendedPowerPerM2
  if (system === "mat") {
    if (matPowerWPerM2 <= 0 || matPowerWPerM2 > 250) return null
    actualPowerPerM2 = matPowerWPerM2
  }

  const totalPowerW = heatedArea * actualPowerPerM2
  if (!Number.isFinite(totalPowerW) || totalPowerW <= 0) return null

  let cableLengthM: number | undefined
  let matAreaM2: number | undefined

  if (system === "cable") {
    if (cablePowerWPerM <= 0 || cablePowerWPerM > 50) return null
    cableLengthM = totalPowerW / cablePowerWPerM
  } else {
    matAreaM2 = heatedArea
  }

  const monthlyKwh =
    (totalPowerW / 1000) * hoursPerDay * daysPerMonth * (loadPercent / 100)

  if (!Number.isFinite(monthlyKwh) || monthlyKwh < 0) return null

  const estimatedCost =
    tariffPerKwh && tariffPerKwh > 0
      ? monthlyKwh * tariffPerKwh
      : undefined

  return {
    heatedArea,
    recommendedPowerPerM2,
    actualPowerPerM2,
    totalPowerW,
    cableLengthM,
    matAreaM2,
    monthlyKwh,
    estimatedCost,
  }
}

export function computeVentilation(params: VentilationParams): VentilationResult | null {
  const { length, width, height, airChangesPerHour, reservePercent = 10 } = params

  if (length <= 0 || width <= 0 || height <= 0) return null
  if (airChangesPerHour <= 0 || airChangesPerHour > 20) return null
  if (reservePercent < 0 || reservePercent > 50) return null

  const volumeM3 = length * width * height
  if (!Number.isFinite(volumeM3) || volumeM3 <= 0) return null

  const flowM3h = volumeM3 * airChangesPerHour
  const flowLs = flowM3h / 3.6
  const flowWithReserveM3h = flowM3h * (1 + reservePercent / 100)

  return {
    volumeM3,
    flowM3h,
    flowLs,
    flowWithReserveM3h,
  }
}


