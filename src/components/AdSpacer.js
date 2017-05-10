import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

export default function AdSpacer(props) {
  return (
    <View style={{height:props.height}} />
  )
}

AdSpacer.propTypes = {
  height: PropTypes.number
}

AdSpacer.defaultProps = {
  height: 50
}
