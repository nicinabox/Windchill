export const SET_UNITS = 'SET_UNITS'

export function setUnits(unitSystem) {
  return {
    type: SET_UNITS,
    unitSystem
  }
}
