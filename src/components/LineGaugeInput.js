import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LineGauge from 'react-native-line-gauge'

export default function LineGaugeInput ({label, value, units, bounds, onChange}) {
  return (
    <View style={styles.container}>
      <Text style={styles.value} allowFontScaling={false}>
        {value} {units}
      </Text>

      <LineGauge
        styles={lineGaugeStyles}
        onChange={onChange}
        value={value}
        {...bounds}
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
    fontSize: 21
  },
  label: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
})

var lineGaugeStyles = StyleSheet.create({
  container: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  interval: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  intervalValue: {
    color: '#fff',
  },
  large: {
    backgroundColor: '#fff',
  },
  centerline: {
    backgroundColor: '#50E3C2',
  }
})
