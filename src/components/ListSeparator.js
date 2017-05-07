import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function ListSeparator (props) {
  return <View style={styles.separator} />
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb'
  }
})
