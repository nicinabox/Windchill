const toC = (t) => ((t - 32) * 5 / 9).toFixed(1)
const toF = (t) => (t * 9 / 5 + 32).toFixed(1)

export const US = 'us'
export const SI = 'si'

export const UNITS = {
  [SI]: {
    temperature: 'C',
    speed: 'kph'
  },
  [US]: {
    temperature: 'F',
    speed: 'mph'
  }
}

export const convertSpeed = (speed, convertTo = SI) => {
  if (convertTo === SI) {
    return (speed * 1.60934).toFixed(1)
  } else {
    return (speed / 1.60934).toFixed(1)
  }
}

export const convertTemp = (temp, convertTo = SI) => {
  if (convertTo === SI) {
    return toC(temp)
  } else {
    return toF(temp)
  }
}
