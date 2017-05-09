import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import * as colors from '../styles/colors'

export default function Button (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Text style={[styles.buttonText, props.textStyle]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: colors.brandPrimary,
    fontSize: 17
  },
})
