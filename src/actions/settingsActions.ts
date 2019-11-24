import { Unit } from "src/utils/units"

export const SET_UNITS = 'SET_UNITS'
export const SET_TEMPERATURE_UNIT = 'SET_TEMPERATURE_UNIT'
export const SET_SPEED_UNIT = 'SET_SPEED_UNIT'

export function setUnits(measurement: 'speed' | 'temperature', unit: Unit) {
  return {
    type: SET_UNITS,
    measurement,
    unit,
  }
}
