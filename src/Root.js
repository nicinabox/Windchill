import React, { Component } from 'react'
import { windchill } from 'weather-tools'
import ReactNative from 'react-native'
import Tape from './components/Tape'
import { get } from './utils/http'
import { US, SI, UNITS, convertTemp, convertSpeed } from './utils/conversions'

var {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  View,
  Text,
} = ReactNative

const FORECAST_API_KEY = process.env.FORECAST_API_KEY
const ENABLE_FORECAST = process.env.ENABLE_FORECAST || !__DEV__

const BOUNDS = {
  [SI]: {
    speed: {
      min: 5,
      max: 170,
    },
    temp: {
      min: -17,
      max: 10,
    }
  },
  [US]: {
    speed: {
      min: 3,
      max: 99,
    },
    temp: {
      min: 0,
      max: 50,
    }
  }
}

export default class Root extends Component {
  constructor(props) {
    super(props)

    this._handleTemperatureChange = this._handleTemperatureChange.bind(this)
    this._handleWindSpeedChange = this._handleWindSpeedChange.bind(this)

    this.state = {
      speed: BOUNDS[US].speed.min,
      temp: BOUNDS[US].temp.max,
      unit: US
    }
  }

  componentDidMount() {
    this._getCurrentForecast()
  }

  _getCurrentForecast() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this._queryDarkSky(position.coords)
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }

  _queryDarkSky(coords = {}) {
    if (!ENABLE_FORECAST) return

    let { latitude, longitude } = coords
    var url = `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${[latitude, longitude].join(',')}`

    get(url).then((resp) => {
      let { temperature, windSpeed } = resp.currently

      this.setState({
        temp: Math.round(temperature),
        speed: Math.round(windSpeed)
      }, () => {
        this._speed.value(this.state.speed)
        this._temp.value(this.state.temp)
      })
    })
  }

  _calculateWindChill() {
    let { temp, speed, unit } = this.state
    return windchill[unit](temp, speed)
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
  }

  _handleWindSpeedChange(speed) {
    this.setState({ speed })
  }

  _handleUnitChange(unit) {
    if (unit === this.state.unit) return

    this.setState({
      unit,
      speed: Math.round(convertSpeed(this.state.speed, unit)),
      temp: Math.round(convertTemp(this.state.temp, unit)),
    }, () => {
      this._speed.value(this.state.speed)
      this._temp.value(this.state.temp)
    })
  }

  render() {
    let { unit, speed, temp } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.unitControls}>
          {[US, SI].map((u) => {
            return (
              <TouchableHighlight key={`unit-${u}`} onPress={() => this._handleUnitChange(u)}>
                <View style={[styles.unitControl, unit === u && styles.unitControlActive]}>
                  <Text style={[styles.unitControlText, unit === u && styles.unitControlActiveText]}>
                    {u.toUpperCase()}
                  </Text>
                </View>
              </TouchableHighlight>
            )
          })}
        </View>

        <View style={styles.feelsLike}>
          <Text style={styles.feelsLikeText}>
            Feels like
          </Text>
          <Text style={styles.feelsLikeTempText}>
            {this._calculateWindChill()}
          </Text>
        </View>

        <View style={styles.controls}>
          <View style={styles.tape}>
            <Text style={styles.tapeValue}>{speed} {UNITS[unit].speed}</Text>
            <Tape
              ref={r => this._speed = r}
              onChange={this._handleWindSpeedChange}
              initialValue={this.state.speed}
              {...BOUNDS[unit].speed} />

            <Text style={styles.tapeLabel}>Wind speed</Text>
          </View>

          <View style={styles.tape}>
            <Text style={styles.tapeValue}>{temp} {UNITS[unit].temperature}</Text>
            <Tape
              ref={r => this._temp = r}
              onChange={this._handleTemperatureChange}
              initialValue={this.state.temp}
              {...BOUNDS[unit].temp} />

            <Text style={styles.tapeLabel}>Temperature</Text>
          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  tape: {
    marginBottom: 40
  },
  tapeValue: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  tapeLabel: {
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
  unitControls: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  unitControl: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fff',
  },
  unitControlActive: {
  },
  unitControlActiveText: {
    color: '#4990E2',
    fontWeight: 'bold',
  },
  unitControlText: {
    fontSize: 12,
    color: '#aaa'
  }
})
