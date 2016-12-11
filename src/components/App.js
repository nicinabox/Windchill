import React, { Component } from 'react'
import { windchill } from 'weather-tools'
import ReactNative from 'react-native'
import LineGauge from 'react-native-line-gauge'
import CurrentConditions from './CurrentConditions'
import UnitSystemControls from './UnitSystemControls'
import { US, SI, UNITS, convertTemp, convertSpeed } from '../utils/conversions'
import { setUnits } from '../utils/unitSystem'

var {
  StyleSheet,
  Dimensions,
  View,
  Text,
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

export default class App extends Component {
  constructor(props) {
    super(props)

    this._handleTemperatureChange = this._handleTemperatureChange.bind(this)
    this._handleWindSpeedChange = this._handleWindSpeedChange.bind(this)
    this._handleUnitChange = this._handleUnitChange.bind(this)
    this._handleConditionsPress = this._handleConditionsPress.bind(this)

    let units = props.units

    this.state = {
      speed: BOUNDS[units].speed.min,
      temp: BOUNDS[units].temp.max,
      units
    }
  }

  _calculateWindChill() {
    let { temp, speed, units } = this.state
    return windchill[units](temp, speed) || temp
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
  }

  _handleWindSpeedChange(speed) {
    this.setState({ speed })
  }

  _handleUnitChange(units) {
    if (units === this.state.units) return

    setUnits(units)

    this.setState({
      units,
      speed: Math.round(convertSpeed(this.state.speed, units)),
      temp: Math.round(convertTemp(this.state.temp, units)),
    })
  }

  _handleConditionsPress(currently) {
    this.setState(currently)
  }

  render() {
    let { units, speed, temp } = this.state
    let feelsLike = this._calculateWindChill()

    return (
      <View style={styles.container}>
        <CurrentConditions
          units={units}
          onPress={this._handleConditionsPress} />

        <View style={styles.feelsLike}>
          <View>
            <Text style={styles.feelsLikeText}>
              Feels like
            </Text>
            <Text style={styles.feelsLikeTempText}>
              {feelsLike}
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>{speed} {UNITS[units].speed}</Text>
            <LineGauge
              onChange={this._handleWindSpeedChange}
              value={speed}
              {...BOUNDS[units].speed} />

            <Text style={styles.linearGaugeLabel}>Wind speed</Text>
          </View>

          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>{temp} {UNITS[units].temperature}</Text>
            <LineGauge
              onChange={this._handleTemperatureChange}
              value={temp}
              {...BOUNDS[units].temp} />

            <Text style={styles.linearGaugeLabel}>Temperature</Text>
          </View>
        </View>

        <UnitSystemControls units={units} onPress={this._handleUnitChange} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  linearGauge: {
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  linearGaugeValue: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  linearGaugeLabel: {
    textAlign: 'center',
    color: '#4A4A4A'
  },
  controls: {
    flex: 1,
    justifyContent: 'center',
  },
  feelsLike: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feelsLikeText: {
    fontSize: 38,
    color: '#4990E2',
    fontWeight: '200',
    textAlign: 'center',
  },
  feelsLikeTempText: {
    fontSize: 144,
    fontWeight: '100',
    color: '#4990E2',
    textAlign: 'center',
  },
  errorText: {
    color: '#D13856',
    padding: 30
  }
})
