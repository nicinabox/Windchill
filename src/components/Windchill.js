import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { windchill } from 'weather-tools'
import { US, SI, UNITS, convertTemp, convertSpeed } from '../utils/conversions'
import CurrentConditions from './CurrentConditions'
import LineGaugeInput from './LineGaugeInput'
import FeelsLike from './FeelsLike'

var {
  StyleSheet,
  View,
} = ReactNative

const BOUNDS = {
  [SI]: {
    speed: {
      min: 5,
      max: 170,
    },
    temp: {
      min: -45,
      max: 10,
    }
  },
  [US]: {
    speed: {
      min: 3,
      max: 100,
    },
    temp: {
      min: -50,
      max: 50,
    }
  }
}

export class Windchill extends Component {
  constructor(props) {
    super(props)

    this._handleTemperatureChange = this._handleTemperatureChange.bind(this)
    this._handleWindSpeedChange = this._handleWindSpeedChange.bind(this)
    this._handleConditionsPress = this._handleConditionsPress.bind(this)

    const { unitSystem } = props.state.settings

    this.state = {
      settingsVisible: false,
      speed: BOUNDS[unitSystem].speed.min,
      temp: BOUNDS[unitSystem].temp.max,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { unitSystem } = nextProps.state.settings

    if (unitSystem !== this.props.state.settings.unitSystem) {
      this.setState({
        speed: Math.round(convertSpeed(this.state.speed, unitSystem)),
        temp: Math.round(convertTemp(this.state.temp, unitSystem)),
      })
    }
  }

  _calculateWindChill() {
    let { temp, speed } = this.state
    const { unitSystem } = this.props.state.settings
    speed = speed >= BOUNDS[unitSystem].speed.min
      ? speed
      : BOUNDS[unitSystem].speed.min

    return windchill[unitSystem](temp, speed, false)
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
    this.props.onChange()
  }

  _handleWindSpeedChange(speed) {
    this.setState({ speed })
    this.props.onChange()
  }

  _handleConditionsPress(currently) {
    this.setState(currently)
  }

  render() {
    let { speed, temp } = this.state
    let { unitSystem } = this.props.state.settings

    return (
      <View style={styles.container}>
        <FeelsLike value={this._calculateWindChill()} />

        <View style={styles.controls}>
          <CurrentConditions
            unitSystem={unitSystem}
            onPress={this._handleConditionsPress}
          />

          <LineGaugeInput
            label="Wind Speed"
            value={speed}
            units={UNITS[unitSystem].speed}
            bounds={BOUNDS[unitSystem].speed}
            onChange={this._handleWindSpeedChange}
          />

          <LineGaugeInput
            label="Temperature"
            value={temp}
            units={UNITS[unitSystem].temperature}
            bounds={BOUNDS[unitSystem].temp}
            onChange={this._handleTemperatureChange}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  controls: {
    justifyContent: 'center',
  },
  settingsText: {
    color: '#fff',
    fontSize: 23,
  },
})

export default connect((state) => ({state}))(Windchill)
