import { get } from '../utils/http'
import { DARK_SKY } from './conversions'

const FORECAST_API_KEY = process.env.FORECAST_API_KEY // eslint-disable-line

const mockConditions = () => {
  return Promise.resolve(require('../../mocks/conditions.json'))
}

export default ({ latitude, longitude }, unitSystem) => {
  if (__DEV__) {
    return mockConditions()
      .then((resp) => ({ unitSystem, ...resp.currently }))
  }

  const units = DARK_SKY.translations[unitSystem] || unitSystem

  const url = [
    'https://api.forecast.io/forecast',
    [latitude, longitude].join(','),
  ].join('/') + `?units=${units}`

  return get(url).then((resp) => ({ unitSystem, ...resp.currently }))
}
