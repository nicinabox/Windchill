import React from 'react'
import { Dimensions, StyleSheet, View, Text, PixelRatio } from 'react-native'

const { height: HEIGHT } = Dimensions.get('window')

const feelsLikeMap = {
  // iPhone X
  812: 60,

  // iPhone Xr
  896: 85,

  // iPhone 8+
  736: 60,

  // iPhone 8
  667: 70,

  // iPhone 5
  568: 55
}

const getFeelsLikeFontSize = () => {
  return (feelsLikeMap[HEIGHT] || 10) * PixelRatio.get()
}

const getFeelsLikeLabelFontSize = () => {
  if (HEIGHT >= 896) {
    return 18 * PixelRatio.get()
  }

  return 12 * PixelRatio.get()
}

export default function FeelsLike ({value}) {
  const fontSize = getFeelsLikeFontSize()

  return (
    <View style={styles.container}>
      <Text style={styles.label} allowFontScaling={false}>
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
    fontSize: getFeelsLikeLabelFontSize(),
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '300',
    textAlign: 'center',
  },
  largeText: {
    fontVariant: ['tabular-nums'],
    fontWeight: '100',
    color: '#fff',
    textAlign: 'center',
  },
})
