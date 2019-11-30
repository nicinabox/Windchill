import React from 'react'
import { StyleSheet, View } from 'react-native'
import { borderColor } from 'src/styles/colors'

interface ListSeparatorProps {}

export const ListSeparator: React.FC<ListSeparatorProps> = () => {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: borderColor,
    marginLeft: 20,
  }
})

export default ListSeparator
