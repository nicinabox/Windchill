import { get } from '../utils/http'
import toBoolean from '../utils/toBoolean'

const FORECAST_API_KEY = process.env.FORECAST_API_KEY

const mockConditions = () => {
  return Promise.resolve(require('../../mocks/conditions.json'))
}

export default ({ latitude, longitude }, units) => {
  if (__DEV__) {
    return mockConditions()
      .then((resp) => ({ units, ...resp.currently }))
  }

  const url = `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${[latitude, longitude].join(',')}?units=${units}`
  return get(url).then((resp) => ({ units, ...resp.currently }))
}