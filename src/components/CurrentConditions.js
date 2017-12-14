import React, { Component } from 'react'
import ReactNative from 'react-native'
import errorReporter from '../utils/errorReporter'
import { UNITS, convertTemp, convertSpeed } from '../utils/conversions'
import fetchCurrentConditions from '../utils/fetchCurrentConditions'
import getPosition from '../utils/getPosition'

var {
  StyleSheet,
  AppState,
  TouchableHighlight,
  Text,
  View,
} = ReactNative

const now = () => +(new Date)
const ONE_MIN = 60
const FIVE_MIN = ONE_MIN * 5

const icons = {
  'clear-day': '☀️',
  'clear-night': '☀️',
  rain: '🌧️',
  snow: '❄️',
  sleet: '❄️',
  wind: '💨',
  fog: '☁️',
  cloudy: '☁️',
  'partly-cloudy-day': '⛅️',
  'partly-cloudy-night': '⛅️',
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

  _getCurrentForecast() {
    if (now() < this.state.lastUpdate + FIVE_MIN) return

    getPosition()
      .then((position) => {
        return fetchCurrentConditions(position.coords, this.props.unitSystem)
      })
      .then((currently) => {
        this.setState({
          currently,
          lastUpdate: now()
        })
      })
      .catch(errorReporter.notify)
  }

  _getTemp() {
    let temp = this.state.currently.temperature

    if (this.props.unitSystem !== this.state.currently.unitSystem) {
      temp = convertTemp(temp, this.props.unitSystem)
    }

    return Math.round(temp)
  }

  _getSpeed() {
    let speed  = this.state.currently.windSpeed

    if (this.props.unitSystem !== this.state.currently.unitSystem) {
      speed = convertSpeed(speed, this.props.unitSystem)
    }

    return Math.round(speed)
  }

  render() {
    let { currently } = this.state
    let temp = this._getTemp()
    let speed = this._getSpeed()

    return (
      <View style={styles.container}>
        {currently ? (
          <TouchableHighlight
            style={styles.button}
            underlayColor="#334284"
            onPress={() => this.props.onPress({ temp, speed })}>
              <Text style={styles.text} allowFontScaling={false}>
                {temp}{UNITS[this.props.unitSystem].temperature}

                {' '}{icons[currently.icon]}{' '}

                {speed}{UNITS[this.props.unitSystem].speed}
              </Text>
          </TouchableHighlight>
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
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  buttonInner: {
    flexDirection: 'row',
  },
  spacer: {
    width: 20,
  },
  text: {
    color: '#fff',
    fontSize: 17
  },
})
