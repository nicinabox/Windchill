import { get } from 'src/utils/http'
import { DarkSkyConditionsCurrently, Coordinates } from '../interfaces/api'

// @ts-ignore
const FORECAST_API_KEY = process.env.FORECAST_API_KEY

export const createDarkSkyUrl = ({ latitude, longitude }: Coordinates) => {
  return `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${[latitude, longitude].join(',')}`
}

export default async (coords: Coordinates): Promise<DarkSkyConditionsCurrently> => {
  const resp = await get(createDarkSkyUrl(coords))
  return resp.currently
}
