import { get } from '../utils/http'

const FORECAST_API_KEY = process.env.FORECAST_API_KEY // eslint-disable-line

const mockConditions = () => {
  return Promise.resolve(require('../../mocks/conditions.json'))
}

export default ({ latitude, longitude }, unitSystem) => {
  if (__DEV__) {
    return mockConditions()
      .then((resp) => ({ unitSystem, ...resp.currently }))
  }

  const url = `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${[latitude, longitude].join(',')}?units=${unitSystem}`
  return get(url).then((resp) => ({ unitSystem, ...resp.currently }))
}
