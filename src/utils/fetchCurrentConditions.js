import { get } from '../utils/http'

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

export default (coords) => {
  const options = {}

  return get(getUrl(coords), options)
    .then((resp) => resp.currently)
}
