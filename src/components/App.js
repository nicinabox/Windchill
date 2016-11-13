import React, { Component } from 'react'
import { windchill } from 'weather-tools'
import ReactNative from 'react-native'
import LineGauge from 'react-native-line-gauge'
import CurrentConditions from './CurrentConditions'
import UnitSystemControls from './UnitSystemControls'
import { US, SI, UNITS, convertTemp, convertSpeed } from '../utils/conversions'

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

    this.state = {
      speed: BOUNDS[US].speed.min,
      temp: BOUNDS[US].temp.max,
      unit: US
    }
  }

  _calculateWindChill() {
    let { temp, speed, units } = this.state
    return windchill[units](temp, speed)
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
  }

  _handleWindSpeedChange(speed) {
    this.setState({ speed })
  }

  _handleUnitChange(units) {
    if (units === this.state.units) return

    this.setState({
      units,
      speed: Math.round(convertSpeed(this.state.speed, units)),
      temp: Math.round(convertTemp(this.state.temp, units)),
    }, () => {
      this._speed.value(this.state.speed)
      this._temp.value(this.state.temp)
    })
  }

  render() {
    let { units, speed, temp } = this.state

    return (
      <View style={styles.container}>
        <CurrentConditions units={units} />

        <View style={styles.feelsLike}>
          <Text style={styles.feelsLikeText}>
            Feels like
          </Text>
          <Text style={styles.feelsLikeTempText}>
            {this._calculateWindChill()}
          </Text>
        </View>

        <View style={styles.controls}>
          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>{speed} {UNITS[units].speed}</Text>
            <LineGauge
              ref={r => this._speed = r}
              onChange={this._handleWindSpeedChange}
              initialValue={this.state.speed}
              {...BOUNDS[units].speed} />

            <Text style={styles.linearGaugeLabel}>Wind speed</Text>
          </View>

          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>{temp} {UNITS[units].temperature}</Text>
            <LineGauge
              ref={r => this._temp = r}
              onChange={this._handleTemperatureChange}
              initialValue={this.state.temp}
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
  },
  feelsLikeTempText: {
    fontSize: 144,
    fontWeight: '100',
    color: '#4990E2',
  },
})
