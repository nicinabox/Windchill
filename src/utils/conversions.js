export const US = 'us'
export const SI = 'si'
export const UK = 'uk'
export const CA = 'ca'

const US_TEMP_MIN = -50
const US_TEMP_MAX = 50
const US_SPEED_MIN = 3
const US_SPEED_MAX = 100

const SI_TEMP_MIN = -45
const SI_TEMP_MAX = 10
const SI_SPEED_MIN = 5
const SI_SPEED_MAX = 170

const MPH = {
  unit: 'mph',
  bounds: {
    min: US_SPEED_MIN,
    max: US_SPEED_MAX,
  }
}

const KPH = {
  unit: 'kph',
  bounds: {
    min: SI_SPEED_MIN,
    max: SI_SPEED_MAX,
  }
}

const F = {
  unit: 'F',
  bounds: {
    min: US_TEMP_MIN,
    max: US_TEMP_MAX,
  }
}

const C = {
  unit: 'C',
  bounds: {
    min: SI_TEMP_MIN,
    max: SI_TEMP_MAX,
  }
}

export const UNITS = {
  [US]: {
    speed: MPH,
    temperature: F
  },
  [SI]: {
    speed: KPH,
    temperature: C,
  },
  [UK]: {
    speed: MPH,
    temperature: C
  },
  [CA]: {
    speed: KPH,
    temperature: F,
  },
}

export const DARK_SKY = {
  icons: {
    'clear-day': '☀️',
    'clear-night': '☀️',
    rain: '🌧️',
    snow: '❄️',
    sleet: '❄️',
    wind: '💨',
    fog: '☁️',
    cloudy: '☁️',
    'partly-cloudy-day': '⛅️',
    'partly-cloudy-night': '⛅️',
  },
  translations: {
    speed: 'windSpeed',
    temperature: 'temperature',
    uk: 'uk2',
  }
}

const toC = (t) => ((t - 32) * 5 / 9).toFixed(1)
const toF = (t) => ((t * 9 / 5) + 32).toFixed(1)

export const convertSpeed = (speed, convertTo = SI) => {
  if ([SI, CA].includes(convertTo)) {
    return (speed * 1.60934).toFixed(1)
  }

  return (speed / 1.60934).toFixed(1)
}

export const convertTemp = (temp, convertTo = SI) => {
  if ([SI, UK].includes(convertTo)) {
    return toC(temp)
  }

  return toF(temp)
}

export const convert = (name, value, convertTo) => {
  switch (name) {
    case 'speed':
      return convertSpeed(value, convertTo)

    case 'temperature':
      return convertTemp(value, convertTo)

    default:
      return false
  }
}

export const convertFrom = (from, to) => (name, value) => {
  if (from === to || UNITS[from][name].unit === UNITS[to][name].unit) {
    return value
  }

  return convert(name, value, to)
}
