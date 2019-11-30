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
  measurement: 'speed' | 'temperature'
  value?: number
  bounds: {
    min: number
    max: number
  }
}

export const MPH: Unit = {
  name: 'mph',
  measurement: 'speed',
  bounds: {
    min: 0,
    max: 100,
  }
}

export const KNOTS: Unit = {
  name: 'knots',
  measurement: 'speed',
  bounds: {
    min: 0,
    max: 87,
  }
}

export const MPS: Unit = {
  name: 'mps',
  measurement: 'speed',
  bounds: {
    min: 0,
    max: 45,
  }
}

export const KPH: Unit = {
  name: 'kph',
  measurement: 'speed',
  bounds: {
    min: 0,
    max: 160,
  }
}

export const F: Unit = {
  name: 'F',
  measurement: 'temperature',
  bounds: {
    min: -50,
    max: 50,
  }
}

export const C: Unit = {
  name: 'C',
  measurement: 'temperature',
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
