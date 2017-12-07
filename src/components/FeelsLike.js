import React from 'react'
import { Dimensions, StyleSheet, View, Text, PixelRatio } from 'react-native'

const { height: HEIGHT } = Dimensions.get('window')

const getFontSize = () => {
  const heightMap = {
    // iPhone X
    812: 60,

    // iPhone 8+
    736: 60,

    // iPhone 8
    667: 70,

    // iPhone 5
    568: 55
  }

  return heightMap[HEIGHT] * PixelRatio.get()
}

export default function FeelsLike ({value}) {
  const fontSize = getFontSize()

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Feels like
      </Text>

      <Text allowFontScaling={false}
        style={[
          styles.largeText,
          {
            fontSize,
            lineHeight: fontSize + 8,
          }
        ]}>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12 * PixelRatio.get(),
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '300',
    textAlign: 'center',
  },
  largeText: {
    fontWeight: '100',
    color: '#fff',
    textAlign: 'center',
  },
})
