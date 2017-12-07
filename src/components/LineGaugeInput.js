import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LineGauge from 'react-native-line-gauge'

export default function LineGaugeInput ({label, value, units, bounds, onChange}) {
  return (
    <View style={styles.linearGauge}>
      <Text style={styles.linearGaugeValue} allowFontScaling={false}>
        {value} {units}
      </Text>

      <LineGauge
        styles={lineGaugeStyles}
        onChange={onChange}
        value={value}
        {...bounds}
      />

      <Text style={styles.linearGaugeLabel}>
        {label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  linearGauge: {
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  linearGaugeValue: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  linearGaugeLabel: {
    textAlign: 'center',
    color: '#fff',
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
