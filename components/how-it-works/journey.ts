import * as THREE from 'three'
import { JOURNEY_NODES } from './nodesData'

export const HOLD_SECONDS = 1.7
export const TRAVEL_SECONDS = 2.6

const N = JOURNEY_NODES.length

export function buildJourneyCurve() {
  const points = JOURNEY_NODES.map((n) => new THREE.Vector3(...n.position))
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.35)
  curve.arcLengthDivisions = 400
  return curve
}

// One full lap = every node's hold + the travel to the next node.
export const CYCLE_SECONDS = N * (HOLD_SECONDS + TRAVEL_SECONDS)

const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

export interface JourneyState {
  /** 0..1 position along the full CatmullRom curve */
  u: number
  /** index of the node the orb is currently at or approaching */
  activeIndex: number
}

/**
 * Given elapsed seconds (any value, will be wrapped), returns where along
 * the curve the orb should be and which node is "active" for the HUD.
 */
export function getJourneyState(elapsed: number): JourneyState {
  const t = elapsed % CYCLE_SECONDS
  const segment = HOLD_SECONDS + TRAVEL_SECONDS
  const rawIndex = Math.floor(t / segment)
  const fromIndex = ((rawIndex % N) + N) % N
  const toIndex = (fromIndex + 1) % N
  const localT = t - rawIndex * segment
  const fromU = fromIndex / (N - 1)
  const toU = toIndex === 0 ? 1 : toIndex / (N - 1)

  if (localT < HOLD_SECONDS) {
    return { u: fromU, activeIndex: fromIndex }
  }

  const travelT = (localT - HOLD_SECONDS) / TRAVEL_SECONDS
  const eased = easeInOutCubic(Math.min(Math.max(travelT, 0), 1))
  const u = fromU + (toU - fromU) * eased
  const activeIndex = eased > 0.5 ? toIndex : fromIndex

  return { u, activeIndex }
}
