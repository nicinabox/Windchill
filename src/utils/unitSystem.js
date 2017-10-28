import Locale from 'react-native-locale'
import { US, SI } from './conversions'

export const getLocaleUnits = () => {
  return Locale.constants().measurementSystem === 'Metric' ? SI : US
}
