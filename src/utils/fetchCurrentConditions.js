import { get } from '../utils/http'
import { DARK_SKY } from './conversions'

const FORECAST_API_KEY = process.env.FORECAST_API_KEY // eslint-disable-line

export const getUnits = (unitSystem) => {
  return DARK_SKY.translations[unitSystem] || unitSystem
}

export const getUrl = ({latitude, longitude}) => {
  return [
    'https://api.forecast.io/forecast',
    FORECAST_API_KEY,
    [latitude, longitude].join(',')
  ].join('/')
}

export default (coords, unitSystem) => {
  const options = {
    params: {
      units: getUnits(unitSystem)
    }
  }

  return get(getUrl(coords), options)
    .then((resp) => ({ unitSystem, ...resp.currently }))
}
