import React, { Component } from 'react'
import ReactNative from 'react-native'
import errorReporter from '../utils/errorReporter'
import { UNITS, convert } from '../utils/conversions'
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

const DARK_SKY = {
  icons: {
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
  },
  translations: {
    speed: 'windSpeed',
    temperature: 'temperature',
  }
}

export default class CurrentConnditions extends Component {
  constructor(props) {
    super(props)

    this._handleAppStateChange = this._handleAppStateChange.bind(this)
    this._getCurrentForecast = this._getCurrentForecast.bind(this)

    this.state = {
      currently: {},
      isLoading: true,
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

    this.setState({ isLoading: true, error: false })

    getPosition()
      .then((position) => {
        return fetchCurrentConditions(position.coords, this.props.unitSystem)
      })
      .then((currently) => {
        this.setState({
          currently,
          isLoading: false,
          error: false,
          lastUpdate: now()
        })
      })
      .catch((error) => {
        errorReporter.notify(error)

        this.setState({
          isLoading: false,
          error: error.message,
        })
      })
  }

  getCurrentCondition(name) {
    let value  = this.state.currently[DARK_SKY.translations[name]]

    if (this.props.unitSystem !== this.state.currently.unitSystem) {
      value = convert(name, value, this.props.unitSystem)
    }

    return Math.round(value)
  }

  getConditions() {
    const localeUnits = UNITS[this.props.unitSystem]

    return ['temperature', 'speed'].reduce((acc, name) => ({
      ...acc,
      [name]: {
        value: this.getCurrentCondition(name),
        units: localeUnits[name],
      },
    }), {})
  }

  renderText(text) {
    return (
      <Text style={styles.text} allowFontScaling={false}>
        {text}
      </Text>
    )
  }

  renderButton({onPress, children}) {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#334284"
        onPress={onPress}>
          {children}
      </TouchableHighlight>
    )
  }

  renderConditions() {
    let { temperature, speed } = this.getConditions()

    return this.renderButton({
      onPress: () => this.props.onPress({
        temperature: temperature.value,
        speed: speed.value
      }),
      children: this.renderText([
        `${temperature.value}${temperature.units}`,
        DARK_SKY.icons[this.state.currently.icon],
        `${speed.value}${speed.units}`,
      ].join(' '))
    })
  }

  render() {
    let children = this.renderText('Getting current conditions...')

    if (this.state.error) {
      children = this.renderButton({
        onPress: this._getCurrentForecast,
        children: this.renderText(this.state.error)
      })
    }

    if (!this.state.isLoading && !this.state.error) {
      children = this.renderConditions()
    }

    return (
      <View style={styles.container}>
        {children}
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
  },
  buttonInner: {
    flexDirection: 'row',
  },
  spacer: {
    width: 20,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
})
