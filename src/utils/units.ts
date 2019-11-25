export interface Units {
  [key: string]: Unit
  speed: Unit
  temperature: Unit
}

export interface Measurements {
  speed: number
  temperature: number
}

export interface Unit {
  name: string
  bounds: {
    min: number
    max: number
  }
}

export const MPH: Unit = {
  name: 'mph',
  bounds: {
    min: 3,
    max: 100,
  }
}

export const KNOTS: Unit = {
  name: 'knots',
  bounds: {
    min: 2,
    max: 87,
  }
}

export const MPS: Unit = {
  name: 'm/s',
  bounds: {
    min: 1,
    max: 45,
  }
}

export const KPH: Unit = {
  name: 'kph',
  bounds: {
    min: -45,
    max: 170,
  }
}

export const F: Unit = {
  name: 'F',
  bounds: {
    min: -50,
    max: 50,
  }
}

export const C: Unit = {
  name: 'C',
  bounds: {
    min: -45,
    max: 10,
  }
}

export const speedUnits = [MPH, KPH, MPS, KNOTS]

export const temperatureUnits = [F, C]

export const defaultMeasurements: { [key: string]: Unit } = {
  speed: MPH,
  temperature: F,
}

export default [MPH, KPH, KNOTS, MPS, F, C].reduce((acc, unit) => {
  return {
    ...acc,
    [unit.name]: unit,
  }
}, {})
