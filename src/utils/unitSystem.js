import Locale from 'react-native-locale'
import { US, SI } from './conversions'
import { getItem, setItem } from './storage'

export const getLocaleUnits = () => {
  return Locale.constants().measurementSystem === 'Metric' ? SI : US
}
