import { Dimensions, Platform } from 'react-native'

export default () => {
  let size = Dimensions.get('window')

  return (
    Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&
    (size.height >= 812 || size.width === 812)
  )
}
