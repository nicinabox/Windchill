import { windchill } from 'weather-tools'
import convert from '../utils/convert'
import { Units, defaultMeasurements } from './units'

export default (temperature: number, speed: number, units: Units): number => {
  const minSpeed = units.speed.bounds.min
  const realSpeed = speed <= minSpeed ? minSpeed : speed

  const tempF = convert(temperature, units.temperature, defaultMeasurements.temperature)
  const speedMPH = convert(realSpeed, units.speed, defaultMeasurements.speed)

  const usWindchill = windchill.us(tempF, speedMPH, false)
  const convertedWindchill = convert(usWindchill, defaultMeasurements.temperature, units.temperature)

  return convertedWindchill
}
