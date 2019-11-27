import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LineGauge from './LineGauge'
import { Unit } from 'src/utils/units'

interface LineGaugeInputProps {
  label: string
  value: number
  unit: Unit
  onChange: (value: number) => void
}

export const LineGaugeInput: React.FC<LineGaugeInputProps> = ({ label, value, unit, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value} allowFontScaling={false}>
        {value} {unit.name}
      </Text>

      <LineGauge
        onChange={onChange}
        value={value}
        {...unit.bounds}
      />

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  value: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 21,
    fontVariant: ['tabular-nums'],
  },
  label: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
})

export default LineGaugeInput
