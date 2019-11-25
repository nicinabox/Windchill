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
    setSpeed(units.speed.bounds.min)
    setTemperature(units.temperature.bounds.max)
  }, [units])

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
