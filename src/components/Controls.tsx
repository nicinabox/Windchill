import React, { useState, useEffect } from 'react'
import CurrentConditions from './CurrentConditions'
import { View, StyleSheet } from 'react-native'
import LineGaugeInput from './LineGaugeInput'
import { Units, Measurements } from 'src/utils/units'

export interface ControlsProps {
  units: Units
  onChange: (values: Measurements) => void
}

export const Controls: React.FC<ControlsProps> = ({ units, onChange }) => {
  const [speed, setSpeed] = useState(units.speed.bounds.min)
  const [temperature, setTemperature] = useState(units.temperature.bounds.max)

  useEffect(() => {
    onChange({ speed, temperature })
  }, [speed, temperature])

  function handleConditionsPress(values: Measurements) {
    setSpeed(values.speed)
    setTemperature(values.temperature)
  }

  return (
    <View style={styles.controls}>
      <CurrentConditions
        onPress={handleConditionsPress}
      />

      <LineGaugeInput
        label="Wind Speed"
        value={speed}
        units={units.speed.name}
        bounds={units.speed.bounds}
        onChange={setSpeed}
      />

      <LineGaugeInput
        label="Temperature"
        value={temperature}
        units={units.temperature.name}
        bounds={units.temperature.bounds}
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