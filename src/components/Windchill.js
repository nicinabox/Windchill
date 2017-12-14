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
    temperature: {
      min: -45,
      max: 10,
    }
  },
  [US]: {
    speed: {
      min: 3,
      max: 100,
    },
    temperature: {
      min: -50,
      max: 50,
    }
  }
}

export class Windchill extends Component {
  constructor(props) {
    super(props)

    this._handleChange = this._handleChange.bind(this)
    this._handleConditionsPress = this._handleConditionsPress.bind(this)

    const { unitSystem } = props.state.settings

    this.state = {
      speed: BOUNDS[unitSystem].speed.min,
      temperature: BOUNDS[unitSystem].temperature.max,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { unitSystem } = nextProps.state.settings

    if (unitSystem !== this.props.state.settings.unitSystem) {
      this.setState({
        speed: Math.round(convertSpeed(this.state.speed, unitSystem)),
        temperature: Math.round(convertTemp(this.state.temperature, unitSystem)),
      })
    }
  }

  _calculateWindChill() {
    let { temperature, speed } = this.state
    const { unitSystem } = this.props.state.settings

    speed = speed >= BOUNDS[unitSystem].speed.min
      ? speed
      : BOUNDS[unitSystem].speed.min

    return windchill[unitSystem](temperature, speed, false)
  }

  _handleChange(nextState) {
    this.setState(nextState)
    this.props.onChange()
  }

  _handleConditionsPress(currently) {
    this.setState(currently)
  }

  render() {
    let { speed, temperature } = this.state
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
            onChange={(speed) => this._handleChange({ speed })}
          />

          <LineGaugeInput
            label="Temperature"
            value={temperature}
            units={UNITS[unitSystem].temperature}
            bounds={BOUNDS[unitSystem].temperature}
            onChange={(temperature) => this._handleChange({ temperature })}
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
