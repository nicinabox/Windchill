import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

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
    color: '#4990E2',
    fontSize: 17
  },
})
