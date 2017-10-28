import React from 'react'
import { View } from 'react-native'
import isIphoneX from '../utils/isIphoneX'

export default function IPhoneXSpacer () {
  const height = isIphoneX() ? 30 : 0

  return (
    <View style={{height}} />
  )
}
