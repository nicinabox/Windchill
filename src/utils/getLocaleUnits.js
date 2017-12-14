import Locale from 'react-native-locale'
import { US, SI, UK, CA } from './conversions'

const constants = Locale.constants()

export default function getLocaleUnits () {
  if (constants.countryCode === 'CA') {
    return CA
  }

  if (constants.countryCode === 'GB') {
    return UK
  }

  if (constants.measurementSystem === 'Metric') {
    return SI
  }

  return US
}
