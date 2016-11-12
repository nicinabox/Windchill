import React, { Component } from 'react'
import ReactNative from 'react-native'
import { get } from '../utils/http'
import toBoolean from '../utils/toBoolean'
import { UNITS, convertTemp, convertSpeed } from '../utils/conversions'

var {
  StyleSheet,
  Text,
  View,
} = ReactNative

const FORECAST_API_KEY = process.env.FORECAST_API_KEY
const ENABLE_FORECAST = toBoolean(process.env.ENABLE_FORECAST) || !__DEV__

const fetchCurrentConditions = ({ latitude, longitude }, unit) => {
  let url = `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${[latitude, longitude].join(',')}?units=${unit}`
  return get(url).then((resp) => ({ unit, ...resp.currently }))
}

export default class CurrentConnditions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currently: false
    }
  }

  componentDidMount() {
    this._getCurrentForecast()
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

    this._getPosition()
      .then((position) => {
        return fetchCurrentConditions(position.coords, this.props.unit)
      })
      .then((currently) => {
        this.setState({ currently })
      })
      .catch((err) => {
        console.log(err);
        alert(err)
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
        ) : null}
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
