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
  Image,
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

    const { units } = props.state.settings

    this.state = {
      settingsVisible: false,
      speed: BOUNDS[units].speed.min,
      temp: BOUNDS[units].temp.max,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { units } = nextProps.state.settings

    if (units !== this.props.state.settings.units) {
      this.setState({
        speed: Math.round(convertSpeed(this.state.speed, units)),
        temp: Math.round(convertTemp(this.state.temp, units)),
      })
    }
  }

  _calculateWindChill() {
    let { temp, speed } = this.state
    const { units } = this.props.state.settings
    speed = speed >= BOUNDS[units].speed.min
      ? speed
      : BOUNDS[units].speed.min

    return windchill[units](temp, speed, false)
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
    let { units } = this.props.state.settings

    return (
      <View style={styles.container}>
        <Image
          source={require('../images/background-gradient.png')}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />

        <FeelsLike value={this._calculateWindChill()} />

        <View style={styles.controls}>
          <CurrentConditions
            units={units}
            onPress={this._handleConditionsPress}
          />

          <LineGaugeInput
            label="Wind Speed"
            value={speed}
            units={UNITS[units].speed}
            bounds={BOUNDS[units].speed}
            onChange={this._handleWindSpeedChange}
          />

          <LineGaugeInput
            label="Temperature"
            value={temp}
            units={UNITS[units].temperature}
            bounds={BOUNDS[units].temp}
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
