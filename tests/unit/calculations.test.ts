import { describe, it, expect } from "vitest"
import {
  computePaintLiters,
  computeBudget,
  computeTile,
  computeWallpaper,
  computeUnderfloorHeating,
  computeFlooring,
  computeBaseboard,
  computeScreed,
  computeVentilation,
  computeLighting,
} from "@/lib/calculations"

describe("computePaintLiters", () => {
  it("calculates liters for a simple 4x4x2.7 room, 2 doors, 1 window, 2 layers", () => {
    const res = computePaintLiters({
      length: 4,
      width: 4,
      height: 2.7,
      doors: 2,
      windows: 1,
      layers: 2,
      coverage: 10,
    })

    // просто проверяем, что число положительное и в разумных пределах
    expect(res?.litersNeeded).toBeGreaterThan(5)
    expect(res?.litersNeeded).toBeLessThan(30)
  })

  it("returns null for invalid data", () => {
    const res = computePaintLiters({
      length: -1,
      width: 4,
      height: 2.7,
      doors: 1,
      windows: 1,
      layers: 2,
      coverage: 10,
    })
    expect(res).toBe(null)
  })

  it("uses realistic default opening areas in the estimate", () => {
    const res = computePaintLiters({
      length: 4,
      width: 4,
      height: 2.7,
      doors: 1,
      windows: 1,
      layers: 2,
      coverage: 10,
    })

    expect(res?.litersNeeded).toBeCloseTo(11.1, 1)
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

  it("reduces wall tile quantity when openings are provided", () => {
    const withoutOpenings = computeTile({
      surfaceType: "wall",
      length: 4,
      width: 2.7,
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

    const withOpenings = computeTile({
      surfaceType: "wall",
      length: 4,
      width: 2.7,
      bathArea: 0,
      tileLength: 30,
      tileWidth: 30,
      groutWidth: 2,
      tilesPerPack: 11,
      windows: 1,
      doors: 1,
      windowArea: 1.8,
      doorArea: 2,
      baseWastePercent: 10,
      additionalWastePercent: 0,
    })

    expect(withoutOpenings).not.toBeNull()
    expect(withOpenings).not.toBeNull()
    expect(withOpenings!.tilesNeeded).toBeLessThan(withoutOpenings!.tilesNeeded)
  })

  it("does not overcount tiles when grout width is added", () => {
    const withoutGrout = computeTile({
      surfaceType: "floor",
      length: 2,
      width: 2,
      bathArea: 0,
      tileLength: 30,
      tileWidth: 30,
      groutWidth: 0,
      tilesPerPack: 10,
      windows: 0,
      doors: 0,
      windowArea: 0,
      doorArea: 0,
      baseWastePercent: 0,
      additionalWastePercent: 0,
    })

    const withGrout = computeTile({
      surfaceType: "floor",
      length: 2,
      width: 2,
      bathArea: 0,
      tileLength: 30,
      tileWidth: 30,
      groutWidth: 3,
      tilesPerPack: 10,
      windows: 0,
      doors: 0,
      windowArea: 0,
      doorArea: 0,
      baseWastePercent: 0,
      additionalWastePercent: 0,
    })

    expect(withoutGrout).not.toBeNull()
    expect(withGrout).not.toBeNull()
    expect(withGrout!.tilesNeeded).toBeLessThan(withoutGrout!.tilesNeeded)
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

  it("reduces rolls when large openings reduce the effective wall area", () => {
    const withoutOpenings = computeWallpaper({
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

    const withOpenings = computeWallpaper({
      calculationType: "room",
      roomWidth: 4,
      roomLength: 4,
      roomHeight: 2.7,
      wallLength: 0,
      wallHeight: 0,
      windows: [{ width: 2, height: 1.5 }],
      doors: [{ width: 1, height: 2 }],
      rollWidthCm: 53,
      rollLengthM: 10,
      patternRepeatCm: 0,
      patternOffset: false,
    })

    expect(withoutOpenings).not.toBeNull()
    expect(withOpenings).not.toBeNull()
    expect(withOpenings!.wallArea).toBeLessThan(withoutOpenings!.wallArea)
    expect(withOpenings!.rollsNeeded).toBeLessThan(withoutOpenings!.rollsNeeded)
  })

  it("reduces wallpaper rolls conservatively when openings are present", () => {
    const withoutOpenings = computeWallpaper({
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

    const withStandardOpenings = computeWallpaper({
      calculationType: "room",
      roomWidth: 4,
      roomLength: 4,
      roomHeight: 2.7,
      wallLength: 0,
      wallHeight: 0,
      windows: [{ width: 2, height: 1.5 }],
      doors: [{ width: 1, height: 2 }],
      rollWidthCm: 53,
      rollLengthM: 10,
      patternRepeatCm: 0,
      patternOffset: false,
    })

    expect(withoutOpenings).not.toBeNull()
    expect(withStandardOpenings).not.toBeNull()
    expect(withoutOpenings!.rollsNeeded).toBe(11)
    expect(withStandardOpenings!.rollsNeeded).toBe(10)
    expect(withoutOpenings!.rollsNeeded - withStandardOpenings!.rollsNeeded).toBe(1)
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
    expect(res!.recommendedPowerPerM2).toBeCloseTo(165, 1)
    expect(res!.cableLengthM).toBeCloseTo(139.76, 2)
    expect(res!.monthlyKwh).toBeCloseTo(256.608, 3)
    expect(res!.estimatedCost).toBeCloseTo(1539.648, 3)
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
    expect(res!.recommendedPowerPerM2).toBeCloseTo(174.8, 1)
    expect(res!.totalPowerW).toBeCloseTo(1632, 0)
    expect(res!.monthlyKwh).toBeCloseTo(122.4, 1)
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

describe("computeFlooring", () => {
  it("calculates packs and planks for straight layout", () => {
    const res = computeFlooring({
      length: 5,
      width: 4,
      exclusionArea: 1.5,
      plankLengthCm: 138,
      plankWidthCm: 19.3,
      packAreaM2: 2.22,
      layout: "straight",
      additionalWastePercent: 2,
      underlayReservePercent: 3,
      pricePerPack: 1800,
    })

    expect(res).not.toBeNull()
    expect(res!.grossArea).toBe(20)
    expect(res!.netArea).toBeCloseTo(18.5, 1)
    expect(res!.wastePercent).toBe(9)
    expect(res!.requiredArea).toBeCloseTo(20.165, 3)
    expect(res!.planksNeeded).toBe(76)
    expect(res!.packsNeeded).toBe(10)
    expect(res!.underlayAreaM2).toBeCloseTo(19.055, 3)
    expect(res!.estimatedCost).toBe(18000)
  })

  it("returns null when exclusion area exceeds the room", () => {
    const res = computeFlooring({
      length: 3,
      width: 3,
      exclusionArea: 9,
      plankLengthCm: 120,
      plankWidthCm: 20,
      packAreaM2: 2.2,
      layout: "straight",
      additionalWastePercent: 0,
    })

    expect(res).toBeNull()
  })
})

describe("computeBaseboard", () => {
  it("calculates pieces for a rectangular room with one doorway", () => {
    const res = computeBaseboard({
      mode: "room",
      roomLength: 5,
      roomWidth: 4,
      customPerimeter: 0,
      doorways: 1,
      doorwayWidth: 0.9,
      profileLengthM: 2.4,
      wastePercent: 7,
      pricePerPiece: 350,
    })

    expect(res).not.toBeNull()
    expect(res!.perimeterM).toBe(18)
    expect(res!.openingsWidthM).toBeCloseTo(0.9, 1)
    expect(res!.netLengthM).toBeCloseTo(17.1, 1)
    expect(res!.totalLengthWithWasteM).toBeCloseTo(18.297, 3)
    expect(res!.piecesNeeded).toBe(8)
    expect(res!.estimatedCost).toBe(2800)
  })

  it("supports custom perimeter mode", () => {
    const res = computeBaseboard({
      mode: "custom",
      roomLength: 0,
      roomWidth: 0,
      customPerimeter: 23.5,
      doorways: 2,
      doorwayWidth: 0.8,
      profileLengthM: 2.5,
      wastePercent: 5,
    })

    expect(res).not.toBeNull()
    expect(res!.netLengthM).toBeCloseTo(21.9, 1)
  })
})

describe("computeScreed", () => {
  it("calculates screed mix bags and water", () => {
    const res = computeScreed({
      length: 5,
      width: 4,
      thicknessMm: 50,
      consumptionKgPerM2Per10Mm: 18,
      bagWeightKg: 25,
      reservePercent: 5,
      waterPerBagL: 4.5,
      pricePerBag: 320,
    })

    expect(res).not.toBeNull()
    expect(res!.areaM2).toBe(20)
    expect(res!.volumeM3).toBeCloseTo(1, 2)
    expect(res!.dryMixKg).toBe(1890)
    expect(res!.bagsNeeded).toBe(76)
    expect(res!.waterLiters).toBe(342)
    expect(res!.estimatedCost).toBe(24320)
  })

  it("returns null for invalid thickness", () => {
    const res = computeScreed({
      length: 5,
      width: 4,
      thicknessMm: 0,
      consumptionKgPerM2Per10Mm: 18,
      bagWeightKg: 25,
      reservePercent: 5,
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
    expect(res!.flowLs).toBeCloseTo(45, 0)
    expect(res!.flowWithReserveM3h).toBeCloseTo(178.2, 1)
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
    expect(res!.totalLumens).toBe(3600)
    expect(res!.totalLumensWithReserve).toBe(3960)
    expect(res!.numberOfLamps).toBe(4)
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


