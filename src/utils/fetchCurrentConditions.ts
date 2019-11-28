// @ts-ignore
import { FORECAST_API_KEY } from 'react-native-dotenv'

import { get } from 'src/utils/http'
import { DarkSkyConditionsCurrently, Coordinates } from 'src/interfaces/api'


export const createDarkSkyUrl = ({ latitude, longitude }: Coordinates) => {
  return `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${latitude},${longitude}`
}

export default async (coords: Coordinates): Promise<DarkSkyConditionsCurrently> => {
  const resp = await get(createDarkSkyUrl(coords))
  return resp.currently
}
