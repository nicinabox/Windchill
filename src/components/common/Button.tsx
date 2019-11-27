import React from 'react'
import { StyleSheet, TouchableOpacity, Text, TextStyle, ViewStyle } from 'react-native'
import * as colors from 'src/styles/colors'

interface ButtonProps {
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Button: React.FC<ButtonProps> = ({ onPress, style, textStyle, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={[styles.buttonText, textStyle]}>
        {children}
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

export default Button
