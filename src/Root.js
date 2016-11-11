import React, { Component } from 'react'
import { windchill } from 'weather-tools'
import ReactNative from 'react-native'
import Tape from './components/Tape'
import { get } from './utils/http'
import { US, SI, UNITS, convertTemp, convertSpeed } from './utils/conversions'

var {
  StyleSheet,
  Dimensions,
  View,
  Text,
} = ReactNative

const FORECAST_API_KEY = process.env.FORECAST_API_KEY
const ENABLE_FORECAST = process.env.ENABLE_FORECAST || !__DEV__

export default class Root extends Component {
  constructor(props) {
    super(props)

    this._handleTemperatureChange = this._handleTemperatureChange.bind(this)
    this._handleWindSpeedChange = this._handleWindSpeedChange.bind(this)

    this.state = {
      wind: 3,
      temp: 1,
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
        wind: Math.round(windSpeed)
      })
    })
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
  }

  _handleWindSpeedChange(wind) {
    this.setState({ wind })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.feelsLike}>
          <Text style={styles.feelsLikeText}>
            Feels like
          </Text>
          <Text style={styles.feelsLikeTempText}>
            {windchill.us(this.state.temp, this.state.wind)}
          </Text>
        </View>

        <View style={styles.controls}>
          <View style={styles.tape}>
            <Text style={styles.tapeValue}>{this.state.wind} mph</Text>
            <Tape min={3} onChange={this._handleWindSpeedChange} />
            <Text style={styles.tapeLabel}>Wind Speed</Text>
          </View>

          <View style={styles.tape}>
            <Text style={styles.tapeValue}>{this.state.temp} F</Text>
            <Tape max={50} onChange={this._handleTemperatureChange} />
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
  }
})
