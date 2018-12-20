import React, { Component } from 'react'
import ReactNative from 'react-native'
import errorReporter from '../utils/errorReporter'
import { UNITS, DARK_SKY, convertFrom } from '../utils/conversions'
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

export default class CurrentConditions extends Component {
  constructor(props) {
    super(props)

    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.getCurrentForecast = this.getCurrentForecast.bind(this)

    this.state = {
      currently: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    this.getCurrentForecast()

    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange(state) {
    if (state === 'active') {
      this.getCurrentForecast()
    }
  }

  getCurrentForecast() {
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
    const convert = convertFrom(this.state.currently.unitSystem, this.props.unitSystem)
    const value = this.state.currently[DARK_SKY.translations[name]]

    return Math.round(convert(name, value))
  }


  getConditions() {
    const localeUnits = UNITS[this.props.unitSystem]

    return ['temperature', 'speed'].reduce((acc, name) => ({
      ...acc,
      [name]: {
        value: this.getCurrentCondition(name),
        unit: localeUnits[name].unit,
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
        `${temperature.value}${temperature.unit}`,
        DARK_SKY.icons[this.state.currently.icon],
        `${speed.value}${speed.unit}`,
      ].join(' '))
    })
  }

  render() {
    let children = this.renderText('Getting current conditions...')

    if (this.state.error) {
      children = this.renderButton({
        onPress: this.getCurrentForecast,
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
