import React, { useState, useEffect } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import windchill from '../utils/windchill'
import FeelsLike from './FeelsLike'
import Controls from './Controls'
import { Units, Measurements } from 'src/utils/units'

var {
  StyleSheet,
  View,
} = ReactNative

interface WindchillProps {
  units: Units
}

export const Windchill: React.FC<WindchillProps> = ({ units }) => {
  const [windchillValue, setWindchillValue] = useState(() => {
    return windchill(
      units.temperature.bounds.max,
      units.speed.bounds.min,
      units,
    )
  })

  useEffect(() => {
    console.log('units changed')
  }, [units])

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   const { unitSystem } = nextProps.state.settings
  //
  //   if (unitSystem !== this.props.state.settings.unitSystem) {
  //     this.setState({
  //       speed: Math.round(convertSpeed(this.state.speed, unitSystem)),
  //       temperature: Math.round(convertTemp(this.state.temperature, unitSystem)),
  //     })
  //   }
  // }

  function handleChange({ speed, temperature }: Measurements) {
    setWindchillValue(windchill(temperature, speed, units))
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
