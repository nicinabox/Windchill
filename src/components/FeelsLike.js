import React from 'react'
import { StyleSheet, View, Text, PixelRatio } from 'react-native'

export default function FeelsLike ({value, largeTextStyle}) {
  return (
    <View style={styles.feelsLike}>
      <View>
        <Text allowFontScaling={false} style={styles.feelsLikeText}>
          Feels like
        </Text>
        <Text allowFontScaling={false} style={[styles.feelsLikeTempText, largeTextStyle]}>
          {value}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  feelsLike: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feelsLikeText: {
    fontSize: 11 * PixelRatio.get(),
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '300',
    textAlign: 'center',
  },
  feelsLikeTempText: {
    fontWeight: '100',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
})
