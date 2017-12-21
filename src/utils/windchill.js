import { windchill } from 'weather-tools'
import { SI, US, UNITS, convertSpeed } from './conversions'

const enhancedWindchill = {
  ...windchill,

  uk: (temp, speed, ...args) => {
    return windchill.si(temp, convertSpeed(speed, SI), ...args)
  },

  ca: (temp, speed, ...args) => {
    return windchill.us(temp, convertSpeed(speed, US), ...args)
  }
}

export default (temperature, speed, unitSystem) => {
  const minSpeed = UNITS[unitSystem].speed.bounds.min
  const realSpeed = speed <= minSpeed ? minSpeed : speed

  return enhancedWindchill[unitSystem](temperature, realSpeed, false)
}
