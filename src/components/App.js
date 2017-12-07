import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { windchill } from 'weather-tools'
import { debounce } from 'lodash'
import CurrentConditions from './CurrentConditions'
import LineGaugeInput from './LineGaugeInput'
import FeelsLike from './FeelsLike'
import Settings from './Settings'
import IPhoneXSpacer from './IPhoneXSpacer'
import Header from './Header'
import AdBanner from './AdBanner'
import { US, SI, UNITS, convertTemp, convertSpeed } from '../utils/conversions'
import { setUnits } from '../actions/settingsActions'
import { checkAdCodeExpiration } from '../actions/productActions'
import { trackAppOpened } from '../actions/analyticsActions'
import * as StoreReview from 'react-native-store-review'

var {
  NativeAppEventEmitter,
  StyleSheet,
  AppState,
  StatusBar,
  Image,
  Modal,
  View,
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

export class App extends Component {
  constructor(props) {
    super(props)

    this._handleTemperatureChange = this._handleTemperatureChange.bind(this)
    this._handleWindSpeedChange = this._handleWindSpeedChange.bind(this)
    this._handleConditionsPress = this._handleConditionsPress.bind(this)
    this._handleAppStateChange = this._handleAppStateChange.bind(this)
    this._requestReview = debounce(this._requestReview.bind(this), 3000)

    const { units } = props.state.settings

    this.state = {
      settingsVisible: false,
      speed: BOUNDS[units].speed.min,
      temp: BOUNDS[units].temp.max,
    }
  }

  componentDidMount() {
    this.props.checkAdCodeExpiration()
    this.props.trackAppOpened()

    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillReceiveProps(nextProps) {
    const { units } = nextProps.state.settings

    if (units !== this.props.state.settings.units) {
      this.setState({
        speed: Math.round(convertSpeed(this.state.speed, units)),
        temp: Math.round(convertTemp(this.state.temp, units)),
      })
    }
  }

  componentWillUnmount () {
    NativeAppEventEmitter.removeAllListeners()
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _calculateWindChill() {
    let { temp, speed } = this.state
    const { units } = this.props.state.settings
    speed = speed >= BOUNDS[units].speed.min
      ? speed
      : BOUNDS[units].speed.min

    return windchill[units](temp, speed, false)
  }

  _handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.props.checkAdCodeExpiration()
      this.props.trackAppOpened()
    }
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
    this._requestReview()
  }

  _handleWindSpeedChange(speed) {
    this.setState({ speed })
    this._requestReview()
  }

  _handleConditionsPress(currently) {
    this.setState(currently)
  }

  _shouldRequestReview() {
    return this.props.state.analytics.opens >= 5
  }

  _requestReview() {
    if (StoreReview.isAvailable && this._shouldRequestReview()) {
      StoreReview.requestReview()
    }
  }

  render() {
    let { speed, temp } = this.state
    let { units, shouldShowAds } = this.props.state.settings

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={this.state.settingsVisible ? 'dark-content' : 'light-content'}
        />

        <Image
          source={require('../images/background-gradient.png')}
          resizeMode="cover"
          style={{
            position: 'absolute',
          }}
        />

        <Modal
          transparent={false}
          visible={this.state.settingsVisible}
          animationType="slide">
          <Settings
            handleClose={() => this.setState({ settingsVisible: false })}
          />
        </Modal>

        <Header
          onSettingsPress={() => this.setState({ settingsVisible: true })}
        />

        <FeelsLike value={this._calculateWindChill()} />

        <View style={styles.controls}>
          <CurrentConditions
            units={units}
            onPress={this._handleConditionsPress}
          />

          <LineGaugeInput
            label="Wind Speed"
            value={speed}
            units={UNITS[units].speed}
            bounds={BOUNDS[units].speed}
            onChange={this._handleWindSpeedChange}
          />

          <LineGaugeInput
            label="Temperature"
            value={temp}
            units={UNITS[units].temperature}
            bounds={BOUNDS[units].temp}
            onChange={this._handleTemperatureChange}
          />
        </View>

        <AdBanner shouldShowAds={shouldShowAds} />
        <IPhoneXSpacer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  controls: {
    justifyContent: 'center',
  },
  settingsText: {
    color: '#fff',
    fontSize: 23,
  },
})

export default connect((state) => ({state}), {
  setUnits,
  checkAdCodeExpiration,
  trackAppOpened,
})(App)
