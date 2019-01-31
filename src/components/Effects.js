import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'

const frostBiteTimes = {
  caution: '30 minutes',
  danger: '10 minutes',
  extreme: '5 minutes',
}

const getTempRisk(temp, windSpeed) {
  if (temp >= -28 && temp < -44) {

  }
}

export default function Effects({temp, windSpeed}) {
  const risk = getTempRisk(temp, windSpeed)
  const time = frostBiteTimes[risk]

  if (!time) return null

  return (
    <Text>
      Danger of frostbite within {time}
    </Text>
  )
}

Effects.propTypes = {}

Effects.defaultProps = {}
