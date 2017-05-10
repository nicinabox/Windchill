import React from 'react'
import { View } from 'react-native'

export default function ListSpacer (props) {
  return <View style={{height:props.height}} />
}

ListSpacer.defaultProps = {
  height: 30
}
