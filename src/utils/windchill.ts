import { windchill } from 'weather-tools'
import convert from 'src/utils/convert'
import { Units, defaultMeasurements } from './units'

// Unit provides UI min, but we want formula min
const FORMULA_MIN_SPEED = 3

export default (temperature: number, speed: number, units: Units): number => {
  if (speed < FORMULA_MIN_SPEED) {
      return temperature
  }

  const tempF = convert(temperature, units.temperature, defaultMeasurements.temperature)
  const speedMPH = convert(speed, units.speed, defaultMeasurements.speed)

  const windchillUS = windchill.us(tempF, speedMPH, false)
  const convertedWindchill = convert(windchillUS, defaultMeasurements.temperature, units.temperature)

  return convertedWindchill
}
