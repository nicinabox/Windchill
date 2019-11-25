import React from 'react'
import { View } from 'react-native'

interface AdSpacerProps {
  height: number
}

export const AdSpacer: React.FC<AdSpacerProps> = ({ height = 50 }) => {
  return (
    <View style={{ height }} />
  )
}

export default AdSpacer
