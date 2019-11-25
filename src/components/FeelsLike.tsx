import React from 'react'
import { Dimensions, StyleSheet, View, Text, PixelRatio } from 'react-native'

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window')
const realWidth = HEIGHT > WIDTH ? WIDTH : HEIGHT;

interface ScaleTextProps {
  deviceBaseWidth?: number
  fontSize?: number
  lineHeight?: number
}

export function scaleText({
  deviceBaseWidth = 375,
  fontSize = 14,
  lineHeight = fontSize + 8,
}: ScaleTextProps) {
  return {
    fontSize: Math.round((fontSize * realWidth) / deviceBaseWidth),
    lineHeight: Math.round((lineHeight * realWidth) / deviceBaseWidth),
  };
}

interface FeelsLikeProps {
  value: number
}

export const FeelsLike: React.FC<FeelsLikeProps> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text allowFontScaling={false}
        style={[
          styles.label,
          scaleText({ fontSize: 12 * PixelRatio.get() })
        ]}>
        Feels like
      </Text>

      <Text allowFontScaling={false}
        style={[
          styles.largeText,
          scaleText({ fontSize: 50 * PixelRatio.get() })
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

export default FeelsLike
