import React, { Component } from 'react'
import ReactNative from 'react-native'
import { get } from '../utils/http'
import toBoolean from '../utils/toBoolean'
import { UNITS, convertTemp, convertSpeed } from '../utils/conversions'

var {
  StyleSheet,
  AppState,
  Text,
  View,
} = ReactNative

const FORECAST_API_KEY = process.env.FORECAST_API_KEY
const ENABLE_FORECAST = toBoolean(process.env.ENABLE_FORECAST) || !__DEV__

const now = () => +(new Date)
const ONE_MIN = 60
const FIVE_MIN = ONE_MIN * 5

const fetchCurrentConditions = ({ latitude, longitude }, unit) => {
  let url = `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${[latitude, longitude].join(',')}?units=${unit}`
  return get(url).then((resp) => ({ unit, ...resp.currently }))
}

export default class CurrentConnditions extends Component {
  constructor(props) {
    super(props)

    this._handleAppStateChange = this._handleAppStateChange.bind(this)

    this.state = {
      currently: false
    }
  }

  componentDidMount() {
    this._getCurrentForecast()

    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange(state) {
    if (state === 'active') {
      this._getCurrentForecast()
    }
  }

  _getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      })
    })
  }

  _getCurrentForecast() {
    if (!ENABLE_FORECAST) return
    if (now() < this.state.lastUpdate + FIVE_MIN) return

    this._getPosition()
      .then((position) => {
        return fetchCurrentConditions(position.coords, this.props.unit)
      })
      .then((currently) => {
        this.setState({
          currently,
          lastUpdate: now()
        })
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      })
  }

  _getTemp() {
    let temp = this.state.currently.temperature

    if (this.props.unit !== this.state.currently.unit) {
      temp = convertTemp(temp, this.props.unit)
    }

    return Math.round(temp) + UNITS[this.props.unit].temperature
  }

  _getSpeed() {
    let speed  = this.state.currently.windSpeed

    if (this.props.unit !== this.state.currently.unit) {
      speed = convertSpeed(speed, this.props.unit)
    }

    return Math.round(speed) + UNITS[this.props.unit].speed
  }

  render() {
    let { currently } = this.state

    return (
      <View style={styles.container}>
        {currently ? (
          <Text style={styles.text}>
            Currently {this._getTemp()}{' '}
            and wind is {this._getSpeed()}
          </Text>
          ) : (
          <Text style={styles.text}>
            Getting current conditions...
          </Text>
        )}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    color: '#aaa'
  }
})
