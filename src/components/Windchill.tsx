import React, { useEffect, useState } from 'react'
import ReactNative from 'react-native'
import { Measurements, Units } from 'src/utils/units'
import getWindchill from 'src/utils/windchill'
import Controls from './Controls'
import FeelsLike from './FeelsLike'
import ViewShot from 'react-native-view-shot'
import ShareImage from './ShareImage'

const {
  StyleSheet,
  View,
} = ReactNative

interface WindchillProps {
  units: Units
  shareImageRef: React.Ref<ViewShot>
}

export const Windchill: React.FC<WindchillProps> = ({ units, shareImageRef }) => {
  const initialSpeed = units.speed.bounds.min
  const initialTemperature = units.temperature.bounds.max

  const [speed, setSpeed] = useState(initialSpeed)
  const [temperature, setTemperature] = useState(initialTemperature)
  const [windchillValue, setWindchillValue] = useState(() => {
    return getWindchill(initialTemperature, initialSpeed, units)
  })

  useEffect(() => {
    setWindchillValue(Math.round(getWindchill(temperature, speed, units)))
  }, [units, speed, temperature])

  function handleChange({ speed, temperature }: Measurements) {
    setSpeed(speed)
    setTemperature(temperature)
  }

  return (
    <View style={styles.container}>
      <ShareImage
        ref={shareImageRef}
        feelsLike={windchillValue}
        temperature={temperature}
        speed={speed}
        units={units}
      />

      <FeelsLike value={windchillValue} />
      <Controls units={units} onChange={handleChange} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  settingsText: {
    color: '#fff',
    fontSize: 23,
  },
})

export default Windchill
