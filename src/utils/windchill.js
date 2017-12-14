import { windchill } from 'weather-tools'
import { UK, CA, US, SI, BOUNDS, convertSpeed, convertTemp } from './conversions'

export default (temperature, speed, unitSystem) => {
  let nextUnitSystem = unitSystem
  let nextSpeed = speed
  let nextTemp = temperature

  if (unitSystem === UK) {
    nextUnitSystem = SI
    nextTemp = convertTemp(temperature, nextUnitSystem)
  }

  if (unitSystem === CA) {
    nextUnitSystem = SI
    nextTemp = convertSpeed(speed, nextUnitSystem)
  }

  const minSpeed = BOUNDS[nextUnitSystem].speed.min
  nextSpeed = nextSpeed <= minSpeed ? minSpeed : nextSpeed

  return windchill[nextUnitSystem](nextTemp, nextSpeed, false)
}
