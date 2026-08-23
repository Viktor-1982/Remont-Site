export interface PaintParams {
  length: number
  width: number
  height: number
  doors: number
  windows: number
  layers: number
  coverage: number
  pricePerLiter?: number
}

export interface PaintResult {
  litersNeeded: number
  estimatedCost?: number
}

const DEFAULT_DOOR_AREA_M2 = 1.9
const DEFAULT_WINDOW_AREA_M2 = 1.8
const WALLPAPER_WINDOW_REDUCTION_FACTOR = 0.35

// Расчет литров краски и ориентировочной стоимости
export function computePaintLiters(params: PaintParams): PaintResult | null {
  const { length, width, height, doors, windows, layers, coverage, pricePerLiter } = params

  if (coverage <= 0) return null
  if (length <= 0 || width <= 0 || height <= 0 || layers <= 0) return null

  const d = doors * DEFAULT_DOOR_AREA_M2
  const win = windows * DEFAULT_WINDOW_AREA_M2
  const wallArea = Math.max(0, 2 * height * (length + width) - (d + win))
  const ceilingArea = length * width
  const area = (wallArea + ceilingArea) * layers
  if (area <= 0) return null

  const liters = area / coverage
  if (!Number.isFinite(liters) || liters <= 0) return null

  const estimatedCost = pricePerLiter && pricePerLiter > 0 ? liters * pricePerLiter : undefined

  return {
    litersNeeded: liters,
    estimatedCost,
  }
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
  wallMode?: "single" | "room"
  length: number // длина пола, ширина стены или длина комнаты
  width: number  // ширина пола, высота стены или ширина комнаты
  height?: number // высота комнаты (для wallMode === "room")
  bathArea: number
  tileLength: number
  tileWidth: number
  tileThickness?: number // в мм
  groutWidth: number
  tilesPerPack: number
  windows: number
  doors: number
  windowArea: number
  doorArea: number
  baseWastePercent: number
  additionalWastePercent: number
  pricePerPack?: number
}

export interface TileResult {
  tilesNeeded: number
  packsNeeded: number
  singleTileArea: number
  totalArea: number
  glueAmountKg: number
  groutAmountKg: number
  estimatedCost?: number
}

// Плитка: количество плиток, упаковок, клея, затирки и стоимости
export function computeTile(params: TileParams): TileResult | null {
  const {
    surfaceType,
    wallMode = "single",
    length,
    width,
    height,
    bathArea,
    tileLength,
    tileWidth,
    tileThickness = 8,
    groutWidth,
    tilesPerPack,
    windows,
    doors,
    windowArea,
    doorArea,
    baseWastePercent,
    additionalWastePercent,
    pricePerPack,
  } = params

  if (length <= 0 || width <= 0 || tileLength <= 0 || tileWidth <= 0) return null
  if (groutWidth < 0 || groutWidth > 20) return null
  if (tilesPerPack <= 0) return null

  if (length > 100 || width > 100 || tileLength > 200 || tileWidth > 200) return null

  let surfaceArea = 0

  if (surfaceType === "floor") {
    surfaceArea = length * width
    if (bathArea > 0) {
      surfaceArea = Math.max(0, surfaceArea - bathArea)
    }
  } else {
    // surfaceType === "wall"
    if (wallMode === "room") {
      const h = height || 2.7
      surfaceArea = 2 * h * (length + width)
    } else {
      surfaceArea = length * width
    }
  }

  let totalArea = surfaceArea
  if (surfaceType === "wall") {
    const windowsTotal = windows * (windowArea > 0 ? windowArea : 2)
    const doorsTotal = doors * (doorArea > 0 ? doorArea : 2)
    totalArea = Math.max(0, surfaceArea - windowsTotal - doorsTotal)
  }

  const tileLengthM = tileLength / 100
  const tileWidthM = tileWidth / 100
  const tileAreaM2 = tileLengthM * tileWidthM
  const groutM = groutWidth / 1000
  const moduleAreaM2 = (tileLengthM + groutM) * (tileWidthM + groutM)
  if (moduleAreaM2 <= 0) return null

  const tilesWithoutWaste = totalArea / moduleAreaM2

  const totalWaste = baseWastePercent + additionalWastePercent
  const tilesWithWaste = Math.ceil(tilesWithoutWaste * (1 + totalWaste / 100))
  const packs = Math.ceil(tilesWithWaste / tilesPerPack)

  // Динамический расчет расхода клея в зависимости от максимального размера плитки
  const maxDim = Math.max(tileLength, tileWidth)
  let gluePerSquareMeter = 4.5
  if (maxDim <= 10) gluePerSquareMeter = 2.5
  else if (maxDim <= 20) gluePerSquareMeter = 3.5
  else if (maxDim <= 40) gluePerSquareMeter = 4.5
  else if (maxDim <= 60) gluePerSquareMeter = 5.5
  else gluePerSquareMeter = 7.5

  const glueNeeded = Math.ceil(totalArea * gluePerSquareMeter)

  // Расчет затирки по формуле: Расход (кг/м2) = ((A+B)/(A*B)) * C * D * 1.6
  // A, B, C, D в миллиметрах
  const tileLengthMm = tileLength * 10
  const tileWidthMm = tileWidth * 10
  const thicknessMm = tileThickness
  const groutConsumption = ((tileLengthMm + tileWidthMm) / (tileLengthMm * tileWidthMm)) * thicknessMm * groutWidth * 1.6
  const groutNeeded = Math.ceil(totalArea * groutConsumption * 1.1) // 10% запас

  if (
    !Number.isFinite(tilesWithWaste) ||
    !Number.isFinite(packs) ||
    !Number.isFinite(glueNeeded) ||
    !Number.isFinite(groutNeeded)
  ) {
    return null
  }

  const estimatedCost = pricePerPack && pricePerPack > 0 ? packs * pricePerPack : undefined

  return {
    tilesNeeded: tilesWithWaste,
    packsNeeded: packs,
    singleTileArea: tileAreaM2,
    totalArea,
    glueAmountKg: glueNeeded,
    groutAmountKg: groutNeeded,
    estimatedCost,
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
  pricePerRoll?: number
}

export interface WallpaperResult {
  wallArea: number
  rollsNeeded: number
  estimatedCost?: number
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

  const totalLinearWidth =
    calculationType === "room" ? 2 * (roomWidth + roomLength) : wallLength
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

  if (netWallArea <= 0) {
    return { wallArea: 0, rollsNeeded: 0 }
  }

  const equivalentLinearWidthByArea = netWallArea / refHeight
  const doorReductionWidth = doors.reduce((sum, door) => {
    if (door.width <= 0 || door.height <= 0) return sum
    const heightFactor = Math.min(door.height / refHeight, 1)
    return sum + door.width * heightFactor
  }, 0)
  const windowReductionWidth = windows.reduce((sum, window) => {
    if (window.width <= 0 || window.height <= 0) return sum
    const heightFactor = Math.min(window.height / refHeight, 1)
    return sum + window.width * heightFactor * WALLPAPER_WINDOW_REDUCTION_FACTOR
  }, 0)

  // Wallpaper is bought in full-height strips, so openings should reduce the count
  // more conservatively than a pure area subtraction.
  const stripBasedLinearWidth = Math.max(
    0,
    totalLinearWidth - doorReductionWidth - windowReductionWidth,
  )
  const adjustedLinearWidth = Math.max(equivalentLinearWidthByArea, stripBasedLinearWidth)
  const rollsNeeded = Math.ceil(Math.ceil(adjustedLinearWidth / rollW) / stripsPerRoll)
  const estimatedCost = params.pricePerRoll && params.pricePerRoll > 0 ? rollsNeeded * params.pricePerRoll : undefined
  return { wallArea: netWallArea, rollsNeeded, estimatedCost }
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

export type FlooringLayout = "straight" | "diagonal" | "herringbone"

export interface FlooringParams {
  length: number
  width: number
  exclusionArea: number
  plankLengthCm: number
  plankWidthCm: number
  packAreaM2: number
  layout: FlooringLayout
  additionalWastePercent: number
  underlayReservePercent?: number
  pricePerPack?: number
}

export interface FlooringResult {
  grossArea: number
  netArea: number
  wastePercent: number
  requiredArea: number
  plankAreaM2: number
  planksNeeded: number
  packsNeeded: number
  underlayAreaM2: number
  estimatedCost?: number
}

export type BaseboardMode = "room" | "custom"

export interface BaseboardParams {
  mode: BaseboardMode
  roomLength: number
  roomWidth: number
  customPerimeter: number
  doorways: number
  doorwayWidth: number
  profileLengthM: number
  wastePercent: number
  pricePerPiece?: number
}

export interface BaseboardResult {
  perimeterM: number
  openingsWidthM: number
  netLengthM: number
  totalLengthWithWasteM: number
  piecesNeeded: number
  estimatedCost?: number
}

export type ScreedMixType = "self-leveling" | "cement-sand" | "lightweight"

export interface ScreedParams {
  length: number
  width: number
  thicknessMm: number
  consumptionKgPerM2Per10Mm: number
  bagWeightKg: number
  reservePercent: number
  waterPerBagL?: number
  pricePerBag?: number
}

export interface ScreedResult {
  areaM2: number
  volumeM3: number
  dryMixKg: number
  bagsNeeded: number
  waterLiters?: number
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

const BASE_WASTE_BY_LAYOUT: Record<FlooringLayout, number> = {
  straight: 7,
  diagonal: 12,
  herringbone: 15,
}

export function computeFlooring(params: FlooringParams): FlooringResult | null {
  const {
    length,
    width,
    exclusionArea,
    plankLengthCm,
    plankWidthCm,
    packAreaM2,
    layout,
    additionalWastePercent,
    underlayReservePercent = 3,
    pricePerPack,
  } = params

  if (length <= 0 || width <= 0 || length > 100 || width > 100) return null
  if (exclusionArea < 0 || exclusionArea >= length * width) return null
  if (plankLengthCm <= 0 || plankWidthCm <= 0) return null
  if (packAreaM2 <= 0 || packAreaM2 > 20) return null
  if (additionalWastePercent < 0 || additionalWastePercent > 20) return null
  if (underlayReservePercent < 0 || underlayReservePercent > 10) return null

  const grossArea = length * width
  const netArea = Math.max(0, grossArea - exclusionArea)
  if (netArea <= 0) return null

  const plankAreaM2 = (plankLengthCm / 100) * (plankWidthCm / 100)
  if (plankAreaM2 <= 0 || plankAreaM2 > 5) return null

  const wastePercent = BASE_WASTE_BY_LAYOUT[layout] + additionalWastePercent
  const requiredArea = netArea * (1 + wastePercent / 100)
  const planksNeeded = Math.ceil(requiredArea / plankAreaM2)
  const packsNeeded = Math.ceil(requiredArea / packAreaM2)
  const underlayAreaM2 = netArea * (1 + underlayReservePercent / 100)

  if (
    !Number.isFinite(requiredArea) ||
    !Number.isFinite(planksNeeded) ||
    !Number.isFinite(packsNeeded) ||
    !Number.isFinite(underlayAreaM2)
  ) {
    return null
  }

  const estimatedCost =
    pricePerPack && pricePerPack > 0 ? packsNeeded * pricePerPack : undefined

  return {
    grossArea,
    netArea,
    wastePercent,
    requiredArea,
    plankAreaM2,
    planksNeeded,
    packsNeeded,
    underlayAreaM2,
    estimatedCost,
  }
}

export function computeBaseboard(params: BaseboardParams): BaseboardResult | null {
  const {
    mode,
    roomLength,
    roomWidth,
    customPerimeter,
    doorways,
    doorwayWidth,
    profileLengthM,
    wastePercent,
    pricePerPiece,
  } = params

  let perimeterM = 0
  if (mode === "room") {
    if (roomLength <= 0 || roomWidth <= 0 || roomLength > 100 || roomWidth > 100) return null
    perimeterM = 2 * (roomLength + roomWidth)
  } else {
    if (customPerimeter <= 0 || customPerimeter > 500) return null
    perimeterM = customPerimeter
  }

  if (doorways < 0 || doorways > 50) return null
  if (doorwayWidth < 0 || doorwayWidth > 5) return null
  if (profileLengthM <= 0 || profileLengthM > 10) return null
  if (wastePercent < 0 || wastePercent > 25) return null

  const openingsWidthM = doorways * doorwayWidth
  if (openingsWidthM >= perimeterM) return null

  const netLengthM = Math.max(0, perimeterM - openingsWidthM)
  const totalLengthWithWasteM = netLengthM * (1 + wastePercent / 100)
  const piecesNeeded = Math.ceil(totalLengthWithWasteM / profileLengthM)

  if (!Number.isFinite(piecesNeeded) || piecesNeeded <= 0) return null

  const estimatedCost =
    pricePerPiece && pricePerPiece > 0 ? piecesNeeded * pricePerPiece : undefined

  return {
    perimeterM,
    openingsWidthM,
    netLengthM,
    totalLengthWithWasteM,
    piecesNeeded,
    estimatedCost,
  }
}

export function computeScreed(params: ScreedParams): ScreedResult | null {
  const {
    length,
    width,
    thicknessMm,
    consumptionKgPerM2Per10Mm,
    bagWeightKg,
    reservePercent,
    waterPerBagL,
    pricePerBag,
  } = params

  if (length <= 0 || width <= 0 || length > 100 || width > 100) return null
  if (thicknessMm <= 0 || thicknessMm > 300) return null
  if (consumptionKgPerM2Per10Mm <= 0 || consumptionKgPerM2Per10Mm > 50) return null
  if (bagWeightKg <= 0 || bagWeightKg > 100) return null
  if (reservePercent < 0 || reservePercent > 20) return null
  if (waterPerBagL !== undefined && (waterPerBagL < 0 || waterPerBagL > 20)) return null

  const areaM2 = length * width
  const volumeM3 = areaM2 * (thicknessMm / 1000)
  const dryMixKg =
    areaM2 * (thicknessMm / 10) * consumptionKgPerM2Per10Mm * (1 + reservePercent / 100)
  const bagsNeeded = Math.ceil(dryMixKg / bagWeightKg)

  if (!Number.isFinite(areaM2) || !Number.isFinite(volumeM3) || !Number.isFinite(dryMixKg)) {
    return null
  }

  const waterLiters =
    waterPerBagL !== undefined && waterPerBagL > 0 ? bagsNeeded * waterPerBagL : undefined
  const estimatedCost =
    pricePerBag !== undefined && pricePerBag > 0 ? bagsNeeded * pricePerBag : undefined

  return {
    areaM2,
    volumeM3,
    dryMixKg,
    bagsNeeded,
    waterLiters,
    estimatedCost,
  }
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

// Освещённость: люмены по норме люкс и площади, количество светильников
export interface LightingParams {
  length: number
  width: number
  roomType: "living" | "kitchen" | "bathroom" | "bedroom" | "office" | "hallway" | "kids"
  lumenPerLamp: number
  reservePercent?: number
  pricePerLamp?: number
}

export interface LightingResult {
  areaM2: number
  targetLux: number
  totalLumens: number
  totalLumensWithReserve: number
  numberOfLamps: number
  estimatedCost?: number
}

const LUX_BY_ROOM: Record<LightingParams["roomType"], number> = {
  living: 150,
  kitchen: 250,
  bathroom: 200,
  bedroom: 150,
  office: 300,
  hallway: 100,
  kids: 200,
}

const LIGHT_LOSS_FACTOR = 1.2

export function computeLighting(params: LightingParams): LightingResult | null {
  const { length, width, roomType, lumenPerLamp, reservePercent = 10 } = params

  if (length <= 0 || width <= 0 || length > 50 || width > 50) return null
  if (lumenPerLamp <= 0 || lumenPerLamp > 50000) return null
  if (reservePercent < 0 || reservePercent > 50) return null

  const areaM2 = length * width
  const targetLux = LUX_BY_ROOM[roomType] ?? 150
  const totalLumens = areaM2 * targetLux * LIGHT_LOSS_FACTOR
  const totalLumensWithReserve = totalLumens * (1 + reservePercent / 100)
  const numberOfLamps = Math.ceil(totalLumensWithReserve / lumenPerLamp)

  if (!Number.isFinite(numberOfLamps) || numberOfLamps <= 0) return null

  const estimatedCost = params.pricePerLamp && params.pricePerLamp > 0 ? numberOfLamps * params.pricePerLamp : undefined

  return {
    areaM2,
    targetLux,
    totalLumens: Math.round(totalLumens),
    totalLumensWithReserve: Math.round(totalLumensWithReserve),
    numberOfLamps,
    estimatedCost,
  }
}

// Звукоизоляция: расчёт материалов для стен, потолка и пола
export type SoundproofingSurface = "wall" | "ceiling" | "floor"
export type WallSystemType = "independent" | "vibro-mount" | "slim-panel"
export type CeilingSystemType = "two-level" | "one-level"
export type FloorSystemType = "floating-screed" | "dry-floor"
export type SoundproofingSystemType = WallSystemType | CeilingSystemType | FloorSystemType

export interface SoundproofingParams {
  surface: SoundproofingSurface
  systemType?: SoundproofingSystemType
  length: number
  widthOrHeight: number // height for wall, width for ceiling/floor
  doors?: number
  windows?: number
  layers?: number // 1, 2, or 3
  studSpacingMm?: 600 | 400
  screedThicknessMm?: number // for floor (e.g. 50-60)
  reservePercent?: number // default 5-10%
  pricePerM2?: number
}

export interface SoundproofingItem {
  id: string
  nameRu: string
  nameEn: string
  category: "boards" | "framing" | "insulation" | "fasteners" | "damping"
  quantity: number
  unitRu: string
  unitEn: string
  descriptionRu?: string
  descriptionEn?: string
}

export interface SoundproofingResult {
  surface: SoundproofingSurface
  systemType: SoundproofingSystemType
  grossAreaM2: number
  netAreaM2: number
  perimeterM: number
  reservePercent: number
  items: SoundproofingItem[]
  estimatedCost?: number
}

export function computeSoundproofing(params: SoundproofingParams): SoundproofingResult | null {
  const {
    surface,
    length,
    widthOrHeight,
    doors = 0,
    windows = 0,
    layers = 2,
    studSpacingMm = 600,
    screedThicknessMm = 50,
    reservePercent = 7,
    pricePerM2,
  } = params

  if (length <= 0 || widthOrHeight <= 0 || length > 100 || widthOrHeight > 100) return null
  if (doors < 0 || windows < 0 || layers < 1 || layers > 3) return null
  if (reservePercent < 0 || reservePercent > 50) return null

  const grossAreaM2 = Math.round(length * widthOrHeight * 100) / 100
  const dArea = surface === "wall" ? doors * DEFAULT_DOOR_AREA_M2 : 0
  const wArea = surface === "wall" ? windows * DEFAULT_WINDOW_AREA_M2 : 0
  const netAreaM2 = Math.max(0.1, Math.round((grossAreaM2 - (dArea + wArea)) * 100) / 100)
  const perimeterM = Math.round(2 * (length + widthOrHeight) * 100) / 100
  const reserveFactor = 1 + reservePercent / 100

  const items: SoundproofingItem[] = []

  // Resolve system type
  let systemType: SoundproofingSystemType = "independent"
  if (surface === "wall") {
    systemType = (params.systemType as WallSystemType) || "independent"
  } else if (surface === "ceiling") {
    systemType = (params.systemType as CeilingSystemType) || "two-level"
  } else {
    systemType = (params.systemType as FloorSystemType) || "floating-screed"
  }

  const STANDARD_SHEET_AREA = 3.0 // 1.2m x 2.5m = 3.0 m2

  if (surface === "wall") {
    const areaWithReserve = netAreaM2 * reserveFactor
    const sheetsPerLayer = Math.ceil(areaWithReserve / STANDARD_SHEET_AREA)

    if (systemType === "slim-panel") {
      const panelCount = Math.ceil((netAreaM2 * reserveFactor) / 0.72)
      items.push({
        id: "sandwich-panels",
        nameRu: "Звукоизоляционные сэндвич-панели (ЗИПС 1200х600)",
        nameEn: "Acoustic Sandwich Panels (ZIPS 1200x600 mm)",
        category: "boards",
        quantity: panelCount,
        unitRu: "шт",
        unitEn: "pcs",
        descriptionRu: "Сэндвич-панели со встроенными виброузлами",
        descriptionEn: "Composite resilient panels with integral vibro-mounts",
      })
      items.push({
        id: "acoustic-drywall",
        nameRu: "Финишный акустический ГКЛ (12.5 мм, 2500х1200)",
        nameEn: "Acoustic Drywall 1/2\" (12.5 mm, 2500x1200 mm)",
        category: "boards",
        quantity: sheetsPerLayer,
        unitRu: "листов",
        unitEn: "sheets",
        descriptionRu: "Утяжелённый финишный слой обшивки",
        descriptionEn: "High-density acoustic gypsum face board",
      })
    } else {
      if (layers >= 1) {
        items.push({
          id: "gvl-board",
          nameRu: "Гипсоволокнистый лист ГВЛВ (12.5 мм, 2500х1200)",
          nameEn: "Gypsum Fiberboard GVL 1/2\" (12.5 mm, 2500x1200 mm)",
          category: "boards",
          quantity: sheetsPerLayer,
          unitRu: "листов",
          unitEn: "sheets",
          descriptionRu: "Первый массивный слой обшивки (~1200 кг/м³)",
          descriptionEn: "High-mass inner sheathing layer (~1200 kg/m³)",
        })
      }
      if (layers >= 2) {
        items.push({
          id: "acoustic-drywall",
          nameRu: "Акустический гипсокартон ГКЛ (12.5 мм, 2500х1200)",
          nameEn: "Acoustic Gypsum Board 1/2\" (12.5 mm, 2500x1200 mm)",
          category: "boards",
          quantity: sheetsPerLayer,
          unitRu: "листов",
          unitEn: "sheets",
          descriptionRu: "Второй финишный слой со смещением швов",
          descriptionEn: "Dense acoustic gypsum outer layer with staggered seams",
        })
      }
      if (layers >= 3) {
        items.push({
          id: "damping-membrane",
          nameRu: "Вязкоупругая мембрана / демпфирующий слой",
          nameEn: "Viscoelastic Damping Membrane (MLV)",
          category: "damping",
          quantity: Math.ceil(netAreaM2 * reserveFactor),
          unitRu: "м²",
          unitEn: "sq m",
          descriptionRu: "Мембрана между слоями ГВЛ и ГКЛ для гашения вибраций",
          descriptionEn: "Constrained-layer damping between drywall sheets",
        })
      }

      const guideMeters = perimeterM * 1.05
      const guideProfiles = Math.ceil(guideMeters / 3.0)
      items.push({
        id: "guide-profile",
        nameRu: "Направляющий профиль ПН 50/40 (3 м)",
        nameEn: "Track / Guide Steel Profile 2\" (50 mm, 3 m / 10 ft)",
        category: "framing",
        quantity: guideProfiles,
        unitRu: "шт",
        unitEn: "pcs",
        descriptionRu: "Монтируется по периметру через демпферную ленту",
        descriptionEn: "Perimeter track decoupled with isolation tape",
      })

      const stepM = studSpacingMm / 1000
      const studCount = Math.ceil(length / stepM) + 1 + (doors + windows) * 2
      const studProfiles = widthOrHeight <= 3.0 ? studCount : Math.ceil((studCount * widthOrHeight) / 3.0)
      items.push({
        id: "stud-profile",
        nameRu: "Стоечный профиль ПС 50/50 (3 м)",
        nameEn: "Stud Steel Profile 2\" (50 mm, 3 m / 10 ft)",
        category: "framing",
        quantity: studProfiles,
        unitRu: "шт",
        unitEn: "pcs",
        descriptionRu: `Стойки с шагом ${studSpacingMm} мм`,
        descriptionEn: `Vertical studs at ${studSpacingMm} mm spacing`,
      })

      const woolArea = Math.round(netAreaM2 * 1.05 * 10) / 10
      const woolPacks = Math.ceil(woolArea / 6.0)
      items.push({
        id: "acoustic-wool",
        nameRu: "Акустическая минеральная вата 50 мм (упак. 6 м²)",
        nameEn: "Acoustic Mineral Wool 2\" (50 mm, pack 6 sq m / 65 sq ft)",
        category: "insulation",
        quantity: woolPacks,
        unitRu: "упак",
        unitEn: "packs",
        descriptionRu: `Общий объём: ${(woolArea * 0.05).toFixed(2)} м³ (плотность 30–60 кг/м³)`,
        descriptionEn: `Total volume: ${(woolArea * 0.05).toFixed(2)} cu m (density 30–60 kg/m³)`,
      })

      if (systemType === "vibro-mount") {
        const mountsPerStud = Math.ceil(widthOrHeight / 0.75)
        const totalMounts = Math.max(studCount * mountsPerStud, Math.ceil(netAreaM2 * 2.8))
        items.push({
          id: "vibro-mounts",
          nameRu: "Виброизолирующие подвесы (с эластомером)",
          nameEn: "Acoustic Isolation Clips (Sylomer / Rubber)",
          category: "damping",
          quantity: totalMounts,
          unitRu: "шт",
          unitEn: "pcs",
          descriptionRu: "Виброразвязка стоечного каркаса от стены",
          descriptionEn: "Resilient mechanical decoupling clips",
        })
      }
    }

    const tapeMeters = Math.round(perimeterM * 2 * 1.05)
    const tapeRolls = Math.ceil(tapeMeters / 30)
    items.push({
      id: "damper-tape",
      nameRu: "Демпферная лента уплотнительная (рулон 30 м)",
      nameEn: "Perimeter Isolation Tape (30 m / 100 ft roll)",
      category: "damping",
      quantity: tapeRolls,
      unitRu: "рул",
      unitEn: "rolls",
      descriptionRu: `Всего: ${tapeMeters} пог. м (в 2 слоя под направляющие)`,
      descriptionEn: `Total: ${tapeMeters} linear m (double layer under tracks)`,
    })

    const sealantTubes = Math.max(1, Math.ceil((perimeterM * layers) / 10))
    items.push({
      id: "acoustic-sealant",
      nameRu: "Виброакустический герметик (туба 310 мл)",
      nameEn: "Acoustical Sealant (310 ml cartridge)",
      category: "damping",
      quantity: sealantTubes,
      unitRu: "туб",
      unitEn: "tubes",
      descriptionRu: "Невысыхающая герметизация швов по периметру",
      descriptionEn: "Non-hardening elastic acoustic sealant",
    })

    items.push({
      id: "screws-layer-1",
      nameRu: "Саморезы для 1-го слоя (TN 25/30 мм)",
      nameEn: "Drywall Screws 1\" (TN 25 mm)",
      category: "fasteners",
      quantity: Math.ceil(netAreaM2 * 16),
      unitRu: "шт",
      unitEn: "pcs",
      descriptionRu: "Для крепления ГВЛВ к каркасу (шаг 200 мм)",
      descriptionEn: "For first sheathing layer to framing",
    })

    if (layers >= 2) {
      items.push({
        id: "screws-layer-2",
        nameRu: "Саморезы для 2-го слоя (TN 35/45 мм)",
        nameEn: "Drywall Screws 1-1/2\" (TN 35/45 mm)",
        category: "fasteners",
        quantity: Math.ceil(netAreaM2 * 20),
        unitRu: "шт",
        unitEn: "pcs",
        descriptionRu: "Для крепления финишного ГКЛ к каркасу",
        descriptionEn: "For outer drywall layer",
      })
    }

    items.push({
      id: "acoustic-dowels",
      nameRu: "Акустические дюбель-гвозди для направляющих",
      nameEn: "Acoustic Track Fasteners / Anchors",
      category: "fasteners",
      quantity: Math.ceil(perimeterM / 0.4),
      unitRu: "шт",
      unitEn: "pcs",
      descriptionRu: "Крепление направляющих профилей (шаг 400 мм)",
      descriptionEn: "Perimeter track anchoring (400 mm spacing)",
    })
  } else if (surface === "ceiling") {
    const areaWithReserve = netAreaM2 * reserveFactor
    const sheetsPerLayer = Math.ceil(areaWithReserve / STANDARD_SHEET_AREA)

    if (layers >= 1) {
      items.push({
        id: "gvl-board",
        nameRu: "Гипсоволокнистый лист ГВЛВ (12.5 мм, 2500х1200)",
        nameEn: "Gypsum Fiberboard GVL 1/2\" (12.5 mm, 2500x1200 mm)",
        category: "boards",
        quantity: sheetsPerLayer,
        unitRu: "листов",
        unitEn: "sheets",
        descriptionRu: "Внутренний плотный слой звукоизоляции",
        descriptionEn: "High-mass inner ceiling layer",
      })
    }
    if (layers >= 2) {
      items.push({
        id: "acoustic-drywall",
        nameRu: "Акустический гипсокартон ГКЛ (12.5 мм, 2500х1200)",
        nameEn: "Acoustic Gypsum Board 1/2\" (12.5 mm, 2500x1200 mm)",
        category: "boards",
        quantity: sheetsPerLayer,
        unitRu: "листов",
        unitEn: "sheets",
        descriptionRu: "Второй финишный слой потолка",
        descriptionEn: "Acoustic drywall outer ceiling layer",
      })
    }

    const mountsCount = Math.max(4, Math.ceil(netAreaM2 * 2.9))
    items.push({
      id: "ceiling-vibro-mounts",
      nameRu: "Потолочные виброподвесы (с эластомером Sylomer)",
      nameEn: "Acoustic Ceiling Isolation Hangers",
      category: "damping",
      quantity: mountsCount,
      unitRu: "шт",
      unitEn: "pcs",
      descriptionRu: "Шаг подвесов 600х800 мм (~2.9 шт/м²)",
      descriptionEn: "Resilient ceiling hangers (~2.9 pcs/m²)",
    })

    const pnpMeters = perimeterM * 1.05
    const pnpCount = Math.ceil(pnpMeters / 3.0)
    items.push({
      id: "ceiling-guide-profile",
      nameRu: "Направляющий потолочный профиль ПНП 28/27 (3 м)",
      nameEn: "Perimeter Ceiling Channel 28/27 (3 m / 10 ft)",
      category: "framing",
      quantity: pnpCount,
      unitRu: "шт",
      unitEn: "pcs",
      descriptionRu: "Монтаж по периметру стен через демпферную ленту",
      descriptionEn: "Perimeter wall track",
    })

    const mainProfiles = Math.ceil(widthOrHeight / 1.2) * length * 1.05
    const carrierProfiles = Math.ceil(length / 0.5) * widthOrHeight * 1.05
    const totalPpProfiles = Math.ceil((mainProfiles + carrierProfiles) / 3.0)
    items.push({
      id: "ceiling-main-profile",
      nameRu: "Потолочный профиль ПП 60/27 (3 м)",
      nameEn: "Ceiling Main/Carrier Profile CD 60/27 (3 m / 10 ft)",
      category: "framing",
      quantity: totalPpProfiles,
      unitRu: "шт",
      unitEn: "pcs",
      descriptionRu: "Основные профили (шаг 1200 мм) + несущие (шаг 500 мм)",
      descriptionEn: "Main profiles (1200 mm step) & cross-carriers (500 mm step)",
    })

    items.push({
      id: "crab-connectors",
      nameRu: "Одноуровневые соединители («крабы» 60/27)",
      nameEn: "Crab Cross Connectors 60/27",
      category: "fasteners",
      quantity: Math.ceil(netAreaM2 * 1.8),
      unitRu: "шт",
      unitEn: "pcs",
      descriptionRu: "Крестовые соединения профилей каркаса",
      descriptionEn: "Cross-joints profile connectors",
    })

    const woolArea = Math.round(netAreaM2 * 1.05 * 10) / 10
    const woolPacks = Math.ceil(woolArea / 6.0)
    items.push({
      id: "acoustic-wool",
      nameRu: "Акустическая минеральная вата 50 мм (упак. 6 м²)",
      nameEn: "Acoustic Mineral Wool 2\" (50 mm, pack 6 sq m)",
      category: "insulation",
      quantity: woolPacks,
      unitRu: "упак",
      unitEn: "packs",
      descriptionRu: `Общий объём: ${(woolArea * 0.05).toFixed(2)} м³`,
      descriptionEn: `Total volume: ${(woolArea * 0.05).toFixed(2)} cu m`,
    })

    items.push({
      id: "damper-tape",
      nameRu: "Демпферная лента уплотнительная (рулон 30 м)",
      nameEn: "Perimeter Isolation Tape (30 m / 100 ft roll)",
      category: "damping",
      quantity: Math.ceil((perimeterM * 1.05) / 30),
      unitRu: "рул",
      unitEn: "rolls",
      descriptionRu: `Периметр примыкания: ${perimeterM} пог. м`,
      descriptionEn: `Perimeter length: ${perimeterM} linear m`,
    })

    items.push({
      id: "acoustic-sealant",
      nameRu: "Виброакустический герметик (туба 310 мл)",
      nameEn: "Acoustical Sealant (310 ml cartridge)",
      category: "damping",
      quantity: Math.max(1, Math.ceil((perimeterM * layers) / 10)),
      unitRu: "туб",
      unitEn: "tubes",
      descriptionRu: "Герметизация примыкания потолка к стенам",
      descriptionEn: "Acoustic perimeter caulk",
    })

    items.push({
      id: "screws-layer-1",
      nameRu: "Саморезы для ГВЛВ (TN 25 мм)",
      nameEn: "Drywall Screws 1\" (TN 25 mm)",
      category: "fasteners",
      quantity: Math.ceil(netAreaM2 * 16),
      unitRu: "шт",
      unitEn: "pcs",
      descriptionRu: "Крепление первого слоя",
      descriptionEn: "First layer fasteners",
    })

    if (layers >= 2) {
      items.push({
        id: "screws-layer-2",
        nameRu: "Саморезы для ГКЛ (TN 35 мм)",
        nameEn: "Drywall Screws 1-1/2\" (TN 35 mm)",
        category: "fasteners",
        quantity: Math.ceil(netAreaM2 * 20),
        unitRu: "шт",
        unitEn: "pcs",
        descriptionRu: "Крепление второго слоя",
        descriptionEn: "Outer layer fasteners",
      })
    }
  } else {
    // Floor
    if (systemType === "floating-screed") {
      const woolArea = Math.round(netAreaM2 * 1.05 * 10) / 10
      const woolPacks = Math.ceil(woolArea / 6.0)
      items.push({
        id: "floor-acoustic-slabs",
        nameRu: "Акустические плиты высокой плотности (100–140 кг/м³, 20–30 мм)",
        nameEn: "High-Density Resilient Floor Boards (100–140 kg/m³, 20–30 mm)",
        category: "insulation",
        quantity: woolPacks,
        unitRu: "упак",
        unitEn: "packs",
        descriptionRu: `Общая площадь: ${woolArea} м² упругого звукоизоляционного ковра`,
        descriptionEn: `Total area: ${woolArea} sq m resilient acoustic underlayment`,
      })

      const membraneArea = Math.round(netAreaM2 * 1.15)
      items.push({
        id: "waterproofing-membrane",
        nameRu: "Гидроизоляционная мембрана (150–200 мкм)",
        nameEn: "Waterproofing Vapor Barrier (6 mil / 150–200 µm)",
        category: "damping",
        quantity: membraneArea,
        unitRu: "м²",
        unitEn: "sq m",
        descriptionRu: "Защита звукоизоляции от цементного раствора (с нахлёстом 15 см)",
        descriptionEn: "Protective slurry barrier with 15 cm overlap",
      })

      const thicknessCm = screedThicknessMm / 10
      const screedKg = Math.round(netAreaM2 * thicknessCm * 18)
      const screedBags = Math.ceil(screedKg / 25)
      items.push({
        id: "screed-mix",
        nameRu: `Смесь цементно-песчаная М300 (мешки 25 кг, слой ${screedThicknessMm} мм)`,
        nameEn: `Cementitious Screed Mix (25 kg bags, ${screedThicknessMm} mm thickness)`,
        category: "boards",
        quantity: screedBags,
        unitRu: "мешков",
        unitEn: "bags",
        descriptionRu: `Всего: ${screedKg} кг смеси для плавающей стяжки`,
        descriptionEn: `Total: ${screedKg} kg dry screed mix`,
      })

      const meshArea = Math.round(netAreaM2 * 1.15)
      items.push({
        id: "reinforcing-mesh",
        nameRu: "Армирующая металлическая сетка (50х50 мм)",
        nameEn: "Welded Reinforcing Steel Mesh (50x50 mm)",
        category: "framing",
        quantity: meshArea,
        unitRu: "м²",
        unitEn: "sq m",
        descriptionRu: "Фиксация в теле стяжки для предотвращения трещин",
        descriptionEn: "Embedded within screed for crack control",
      })

      const edgeTapeM = Math.round(perimeterM * 1.05)
      items.push({
        id: "edge-damper-tape",
        nameRu: "Кромочная демпферная лента для стяжки (100 мм)",
        nameEn: "Perimeter Expansion Edge Strip (100 mm / 4\")",
        category: "damping",
        quantity: Math.ceil(edgeTapeM / 20),
        unitRu: "рул (по 20м)",
        unitEn: "rolls (20m)",
        descriptionRu: `Периметр: ${edgeTapeM} пог. м (выше уровня стяжки)`,
        descriptionEn: `Perimeter: ${edgeTapeM} linear m along walls`,
      })
    } else {
      const underlaymentArea = Math.round(netAreaM2 * 1.05)
      items.push({
        id: "acoustic-underlayment",
        nameRu: "Акустический виброизолирующий мат / холст",
        nameEn: "Acoustic Floor Underlayment Mat",
        category: "insulation",
        quantity: underlaymentArea,
        unitRu: "м²",
        unitEn: "sq m",
        descriptionRu: "Упругий звукоизоляционный слой под сборный пол",
        descriptionEn: "Resilient acoustic subfloor underlayment",
      })

      const superfloorElements = Math.ceil((netAreaM2 * reserveFactor) / 0.72)
      items.push({
        id: "superfloor-elements",
        nameRu: "Элементы пола Кнауф-Суперпол ГВЛВ (1200х600х20 мм)",
        nameEn: "Dry Screed Gypsum Floor Elements (1200x600x20 mm)",
        category: "boards",
        quantity: superfloorElements,
        unitRu: "шт",
        unitEn: "pcs",
        descriptionRu: `Сборное основание пола (${(superfloorElements * 0.72).toFixed(1)} м²)`,
        descriptionEn: `Interlocking dry floor elements (${(superfloorElements * 0.72).toFixed(1)} sq m)`,
      })

      items.push({
        id: "floor-glue",
        nameRu: "Системный клей для фальцев сборного пола",
        nameEn: "Joint Adhesive for Dry Floor Elements",
        category: "damping",
        quantity: Math.max(1, Math.ceil(netAreaM2 * 0.05)),
        unitRu: "кг",
        unitEn: "kg",
        descriptionRu: "Склеивание фальцев элементов пола",
        descriptionEn: "Seam gluing adhesive",
      })

      items.push({
        id: "floor-screws",
        nameRu: "Специальные шурупы для ГВЛ (MN 19 мм)",
        nameEn: "Dry Floor Screws (MN 19 mm)",
        category: "fasteners",
        quantity: Math.ceil(netAreaM2 * 15),
        unitRu: "шт",
        unitEn: "pcs",
        descriptionRu: "Скрепление фальцев между собой (шаг 300 мм)",
        descriptionEn: "For fastening interlocking seams",
      })

      items.push({
        id: "edge-damper-tape",
        nameRu: "Кромочная демпферная лента (рулон 20 м)",
        nameEn: "Perimeter Isolation Edge Tape (20m roll)",
        category: "damping",
        quantity: Math.ceil((perimeterM * 1.05) / 20),
        unitRu: "рул",
        unitEn: "rolls",
        descriptionRu: "Виброразвязка сборного пола от стен",
        descriptionEn: "Wall perimeter isolation",
      })
    }
  }

  const estimatedCost = pricePerM2 && pricePerM2 > 0 ? Math.round(netAreaM2 * pricePerM2) : undefined

  return {
    surface,
    systemType,
    grossAreaM2,
    netAreaM2,
    perimeterM,
    reservePercent,
    items,
    estimatedCost,
  }
}



