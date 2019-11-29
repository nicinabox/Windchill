import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import CurrentConditions from './components/CurrentConditions'
import LineGaugeInput from 'src/components/common/LineGaugeInput'
import { Units, Measurements } from 'src/utils/units'
import requestAppStoreReview from 'src/utils/requestAppStoreReview'

export interface ControlsProps {
  units: Units
  onChange: (values: Measurements) => void
}

export const Controls: React.FC<ControlsProps> = ({ units, onChange }) => {
  const minSpeed = units.speed.bounds.min
  const maxTemperature = units.temperature.bounds.max

  const [speed, setSpeed] = useState(minSpeed)
  const [temperature, setTemperature] = useState(maxTemperature)

  useEffect(() => {
    setSpeed(minSpeed)
  }, [units.speed])

  useEffect(() => {
    setTemperature(maxTemperature)
  }, [units.temperature])

  useEffect(() => {
    onChange({ speed, temperature })
  }, [speed, temperature])

  function handleConditionsPress(values: Measurements) {
    setSpeed(values.speed)
    setTemperature(values.temperature)
    requestAppStoreReview()
  }

  return (
    <View style={styles.controls}>
      <CurrentConditions
        units={units}
        onPress={handleConditionsPress}
      />

      <LineGaugeInput
        label="Wind Speed"
        value={speed}
        unit={units.speed}
        onChange={setSpeed}
      />

      <LineGaugeInput
        label="Temperature"
        value={temperature}
        unit={units.temperature}
        onChange={setTemperature}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  controls: {
    justifyContent: 'center',
  },
})

export default Controls
