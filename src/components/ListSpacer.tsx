import React from 'react'
import { View } from 'react-native'

interface ListSpacerProps {
  height: number
}

export const ListSpacer: React.FC<ListSpacerProps> = ({ height = 30 }) => {
  return <View style={{ height }} />
}

export default ListSpacer
