import { describe, it, expect } from "vitest"
import {
  computePaintLiters,
  computeBudget,
  computeTile,
  computeWallpaper,
  computeUnderfloorHeating,
  computeVentilation,
  computeLighting,
} from "@/lib/calculations"

describe("computePaintLiters", () => {
  it("calculates liters for a simple 4x4x2.7 room, 2 doors, 1 window, 2 layers", () => {
    const liters = computePaintLiters({
      length: 4,
      width: 4,
      height: 2.7,
      doors: 2,
      windows: 1,
      layers: 2,
      coverage: 10,
    })

    // просто проверяем, что число положительное и в разумных пределах
    expect(liters).toBeGreaterThan(5)
    expect(liters).toBeLessThan(30)
  })

  it("returns 0 for invalid data", () => {
    const liters = computePaintLiters({
      length: -1,
      width: 4,
      height: 2.7,
      doors: 1,
      windows: 1,
      layers: 2,
      coverage: 10,
    })
    expect(liters).toBe(0)
  })
})

describe("computeBudget", () => {
  it("sums items and applies reserve percent", () => {
    const { subtotal, reserveAmount, total } = computeBudget({
      items: [100_000, 200_000, 50_000],
      reservePercent: 20,
    })

    expect(subtotal).toBe(350_000)
    expect(reserveAmount).toBeCloseTo(70_000)
    expect(total).toBeCloseTo(420_000)
  })

  it("ignores negative and huge numbers", () => {
    const { subtotal } = computeBudget({
      items: [100_000, -5_000, 2_000_000_000],
      reservePercent: 10,
    })

    expect(subtotal).toBe(100_000)
  })
})

describe("computeTile", () => {
  it("calculates tile and packs for example room 3x2.5 with 30x30 tile", () => {
    const res = computeTile({
      surfaceType: "floor",
      length: 3,
      width: 2.5,
      bathArea: 0,
      tileLength: 30,
      tileWidth: 30,
      groutWidth: 2,
      tilesPerPack: 11,
      windows: 0,
      doors: 0,
      windowArea: 0,
      doorArea: 0,
      baseWastePercent: 10,
      additionalWastePercent: 0,
    })

    expect(res).not.toBeNull()
    expect(res!.tilesNeeded).toBeGreaterThan(20)
    expect(res!.packsNeeded).toBeGreaterThan(1)
  })

  it("returns null for invalid params", () => {
    const res = computeTile({
      surfaceType: "floor",
      length: 0,
      width: 2,
      bathArea: 0,
      tileLength: 30,
      tileWidth: 30,
      groutWidth: 2,
      tilesPerPack: 11,
      windows: 0,
      doors: 0,
      windowArea: 0,
      doorArea: 0,
      baseWastePercent: 10,
      additionalWastePercent: 0,
    })

    expect(res).toBeNull()
  })
})

describe("computeWallpaper", () => {
  it("calculates rolls for 4x4x2.7 room with standard roll", () => {
    const res = computeWallpaper({
      calculationType: "room",
      roomWidth: 4,
      roomLength: 4,
      roomHeight: 2.7,
      wallLength: 0,
      wallHeight: 0,
      windows: [],
      doors: [],
      rollWidthCm: 53,
      rollLengthM: 10,
      patternRepeatCm: 0,
      patternOffset: false,
    })

    expect(res).not.toBeNull()
    expect(res!.wallArea).toBeGreaterThan(30)
    expect(res!.rollsNeeded).toBeGreaterThan(1)
  })

  it("returns null for invalid params", () => {
    const res = computeWallpaper({
      calculationType: "room",
      roomWidth: -1,
      roomLength: 4,
      roomHeight: 2.7,
      wallLength: 0,
      wallHeight: 0,
      windows: [],
      doors: [],
      rollWidthCm: 53,
      rollLengthM: 10,
      patternRepeatCm: 0,
      patternOffset: false,
    })

    expect(res).toBeNull()
  })
})

describe("computeUnderfloorHeating", () => {
  it("calculates cable length and energy usage", () => {
    const res = computeUnderfloorHeating({
      roomArea: 18,
      coveragePercent: 80,
      floorCovering: "tile",
      mode: "comfort",
      system: "cable",
      heatLossFactor: 1,
      belowFloorFactor: 1.1,
      cablePowerWPerM: 17,
      matPowerWPerM2: 150,
      hoursPerDay: 6,
      daysPerMonth: 30,
      loadPercent: 60,
      tariffPerKwh: 6,
    })

    expect(res).not.toBeNull()
    expect(res!.heatedArea).toBeCloseTo(14.4, 1)
    expect(res!.cableLengthM).toBeGreaterThan(80)
    expect(res!.monthlyKwh).toBeGreaterThan(50)
  })

  it("calculates mat area for mat system", () => {
    const res = computeUnderfloorHeating({
      roomArea: 12,
      coveragePercent: 85,
      floorCovering: "laminate",
      mode: "primary",
      system: "mat",
      heatLossFactor: 1.15,
      belowFloorFactor: 0.95,
      cablePowerWPerM: 17,
      matPowerWPerM2: 160,
      hoursPerDay: 5,
      daysPerMonth: 30,
      loadPercent: 50,
      tariffPerKwh: 0.2,
    })

    expect(res).not.toBeNull()
    expect(res!.matAreaM2).toBeCloseTo(10.2, 1)
    expect(res!.totalPowerW).toBeGreaterThan(1000)
  })

  it("returns null for invalid params", () => {
    const res = computeUnderfloorHeating({
      roomArea: 0,
      coveragePercent: 80,
      floorCovering: "tile",
      mode: "comfort",
      system: "cable",
      heatLossFactor: 1,
      belowFloorFactor: 1,
      cablePowerWPerM: 17,
      matPowerWPerM2: 150,
      hoursPerDay: 6,
      daysPerMonth: 30,
      loadPercent: 60,
      tariffPerKwh: 6,
    })

    expect(res).toBeNull()
  })
})

describe("computeVentilation", () => {
  it("calculates airflow by volume and ACH", () => {
    const res = computeVentilation({
      length: 5,
      width: 4,
      height: 2.7,
      airChangesPerHour: 3,
      reservePercent: 10,
    })

    expect(res).not.toBeNull()
    expect(res!.volumeM3).toBeCloseTo(54, 1)
    expect(res!.flowM3h).toBeCloseTo(162, 0)
    expect(res!.flowWithReserveM3h).toBeGreaterThan(res!.flowM3h)
  })

  it("returns null for invalid params", () => {
    const res = computeVentilation({
      length: 0,
      width: 4,
      height: 2.7,
      airChangesPerHour: 3,
      reservePercent: 10,
    })

    expect(res).toBeNull()
  })
})

describe("computeLighting", () => {
  it("calculates lumens and number of lamps for a room", () => {
    const res = computeLighting({
      length: 5,
      width: 4,
      roomType: "living",
      lumenPerLamp: 1000,
      reservePercent: 10,
    })

    expect(res).not.toBeNull()
    expect(res!.areaM2).toBe(20)
    expect(res!.targetLux).toBe(150)
    expect(res!.totalLumens).toBeGreaterThan(3000)
    expect(res!.numberOfLamps).toBeGreaterThanOrEqual(1)
  })

  it("returns null for invalid params", () => {
    const res = computeLighting({
      length: 0,
      width: 4,
      roomType: "kitchen",
      lumenPerLamp: 1000,
      reservePercent: 10,
    })

    expect(res).toBeNull()
  })
})


