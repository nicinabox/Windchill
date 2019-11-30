import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ViewShot from 'react-native-view-shot'
import { gradient } from 'src/styles/colors'
import { Units } from 'src/utils/units'
import FeelsLike from './FeelsLike'

interface ShareImageProps {
  feelsLike: number
  temperature: number
  speed: number
  units: Units
}

export const ShareImage: React.FC<ShareImageProps> = ({ feelsLike, temperature, speed, units }, viewShot) => {
  return (
    <ViewShot ref={viewShot} options={{ result: 'base64' }} style={styles.viewshot}>
      <LinearGradient {...gradient} style={styles.container}>
        <View style={{ flex: 1, }}>
          <FeelsLike value={feelsLike} />
        </View>

        <View style={styles.measurements}>
          <Text style={styles.measurementText}>{speed} {units.speed.name}</Text>
          <View style={styles.spacer} />
          <Text style={styles.measurementText}>{temperature} {units.temperature.name}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.iconContainer}>
            <Image source={require('../images/Icon-Small.png')} style={styles.icon} />
          </View>
          <Text style={styles.footerText}>WindchillApp</Text>
        </View>
      </LinearGradient>
    </ViewShot>
  )
}

const styles = StyleSheet.create({
  viewshot: {
    height: 280,
    width: '100%',
    position: 'absolute',
    right: '100%',
  },
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column',
    padding: 15,
  },
  measurements: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  measurementText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
  },
  spacer: {
    width: 20
  },
  iconContainer: {
    borderRadius: 6,
    marginRight: 6,
    shadowColor: '#000',
    shadowRadius: 6,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  icon: {
    borderRadius: 6,
    width: 25,
    height: 25,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  }
})

export default React.forwardRef(ShareImage)
