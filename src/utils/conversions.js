const toC = (t) => ((t - 32) * 5 / 9).toFixed(1)
const toF = (t) => ((t * 9 / 5) + 32).toFixed(1)

export const US = 'us'
export const SI = 'si'
export const UK = 'uk'
export const CA = 'ca'

export const UNITS = {
  [SI]: {
    speed: 'kph',
    temperature: 'C',
  },
  [US]: {
    speed: 'mph',
    temperature: 'F',
  },
  [UK]: {
    speed: 'mph',
    temperature: 'C',
  },
  [CA]: {
    speed: 'kph',
    temperature: 'F',
  },
}

export const BOUNDS = {
  [SI]: {
    speed: {
      min: 5,
      max: 170,
    },
    temperature: {
      min: -45,
      max: 10,
    }
  },
  [US]: {
    speed: {
      min: 3,
      max: 100,
    },
    temperature: {
      min: -50,
      max: 50,
    }
  },
  [UK]: {
    speed: {
      min: 3,
      max: 100,
    },
    temperature: {
      min: -45,
      max: 10,
    }
  },
  [CA]: {
    speed: {
      min: 5,
      max: 170,
    },
    temperature: {
      min: -50,
      max: 50,
    }
  },
}

export const convertSpeed = (speed, convertTo = SI) => {
  if (convertTo === SI) {
    return (speed * 1.60934).toFixed(1)
  }

  return (speed / 1.60934).toFixed(1)
}

export const convertTemp = (temp, convertTo = SI) => {
  if (convertTo === SI) {
    return toC(temp)
  }

  return toF(temp)
}

export const convert = (name, value, convertTo) => {
  if (name === 'speed') {
    return convertSpeed(value, convertTo)
  }

  if (name === 'temperature') {
    return convertTemp(value, convertTo)
  }
}
