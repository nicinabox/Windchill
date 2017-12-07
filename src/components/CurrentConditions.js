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
        return fetchCurrentConditions(position.coords, this.props.units)
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

    if (this.props.units !== this.state.currently.units) {
      temp = convertTemp(temp, this.props.units)
    }

    return Math.round(temp)
  }

  _getSpeed() {
    let speed  = this.state.currently.windSpeed

    if (this.props.units !== this.state.currently.units) {
      speed = convertSpeed(speed, this.props.units)
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
              Currently {temp}{UNITS[this.props.units].temperature} and wind is {speed}{UNITS[this.props.units].speed}
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
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  text: {
    color: '#fff',
    fontSize: 17
  },
})
