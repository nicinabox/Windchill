import React from 'react'
import { StyleSheet, View } from 'react-native'
import { borderColor } from '../styles/colors'

export const ListSeparator: React.FC<ListSeparatorProps> = () => {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor,
  }
})

export default ListSeparator
