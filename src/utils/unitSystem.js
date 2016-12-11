import Locale from 'react-native-locale'
import { AsyncStorage } from 'react-native'
import { US, SI } from '../utils/conversions'

export const getLocaleUnits = () => {
  return Locale.constants().measurementSystem === 'Metric' ? SI : US
}

export const getUnits = () => {
  return AsyncStorage.getItem('units')
    .then((units) => units || getLocaleUnits())
}

export const setUnits = (units) => {
  return AsyncStorage.setItem('units', units)
}
