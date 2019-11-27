import React, { useEffect, useState } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { Measurements, Units } from 'src/utils/units'
import getWindchill from 'src/utils/windchill'
import Controls from './Controls'
import FeelsLike from './FeelsLike'

var {
  StyleSheet,
  View,
} = ReactNative

interface WindchillProps {
  units: Units
}

export const Windchill: React.FC<WindchillProps> = ({ units }) => {
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

export default connect((state) => ({
  units: state.settings.units
}))(Windchill)
