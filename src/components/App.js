import React, { Component } from 'react'
import { connect } from 'react-redux'
import { windchill } from 'weather-tools'
import { debounce } from 'lodash'
import ReactNative from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LineGauge from 'react-native-line-gauge'
import { AdMobBanner, PublisherBanner } from 'react-native-admob'
import CurrentConditions from './CurrentConditions'
import Settings from './Settings'
import IPhoneXSpacer from './IPhoneXSpacer'
import { US, SI, UNITS, convertTemp, convertSpeed } from '../utils/conversions'
import errorReporter from '../utils/errorReporter'
import isIphoneX from '../utils/isIphoneX'
import { setUnits } from '../actions/settingsActions'
import { checkAdCodeExpiration } from '../actions/productActions'
import { trackAppOpened } from '../actions/analyticsActions'
import * as StoreReview from 'react-native-store-review'

var {
  NativeAppEventEmitter,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AppState,
  StatusBar,
  PixelRatio,
  Image,
  Modal,
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

const { height: HEIGHT } = Dimensions.get('window')

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

  _getFontSize(shouldShowAds) {
    const heightMap = {
      // iPhone X
      812: 57,

      // iPhone 8+
      736: 57,

      // iPhone 8
      667: 70,

      // iPhone 5
      568: shouldShowAds ? 40 : 60,
    }

    return heightMap[HEIGHT] * PixelRatio.get()
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <View />

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => this.setState({ settingsVisible: true })}>
          <Icon name="ios-settings-outline" size={26} style={styles.headerButtonText} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    let { speed, temp } = this.state
    let { units, shouldShowAds } = this.props.state.settings
    let feelsLike = this._calculateWindChill()
    let fontSize = this._getFontSize(shouldShowAds)

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

        {this._renderHeader()}

        <View style={styles.feelsLike}>
          <View>
            <Text style={styles.feelsLikeText}>
              Feels like
            </Text>
            <Text style={[styles.feelsLikeTempText, { fontSize, maxHeight: fontSize }]}>
              {feelsLike}
            </Text>
          </View>
        </View>

        <CurrentConditions
          units={units}
          onPress={this._handleConditionsPress}
        />

        <View style={styles.controls}>
          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>
              {speed} {UNITS[units].speed}
            </Text>

            <LineGauge
              styles={lineGaugeStyles}
              onChange={this._handleWindSpeedChange}
              value={speed}
              {...BOUNDS[units].speed}
            />

            <Text style={styles.linearGaugeLabel}>Wind speed</Text>
          </View>

          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>
              {temp} {UNITS[units].temperature}
            </Text>

            <LineGauge
              styles={lineGaugeStyles}
              onChange={this._handleTemperatureChange}
              value={temp}
              {...BOUNDS[units].temp}
            />

            <Text style={styles.linearGaugeLabel}>Temperature</Text>
          </View>
        </View>

        {shouldShowAds && (
          <View>
            <TouchableOpacity onPress={() => this.setState({ settingsVisible: true })}>
              <Text style={styles.removeAdsText}>
                REMOVE ADS
              </Text>
            </TouchableOpacity>

            <AdMobBanner
              adSize="smartBannerPortrait"
              adUnitID="ca-app-pub-2980728243430969/5287940733"
              testDevices={[PublisherBanner.simulatorId]}
              onAdFailedToLoad={errorReporter.notify}
            />
          </View>
        )}

        <IPhoneXSpacer />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: isIphoneX() ? 24 : 0,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#fff',
  },
  linearGauge: {
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  controls: {
    justifyContent: 'center',
  },
  feelsLike: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeAdsText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    padding: 6
  },
  settingsText: {
    color: '#fff',
    fontSize: 23,
  },
  linearGaugeValue: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  linearGaugeLabel: {
    textAlign: 'center',
    color: '#fff',
  },
  feelsLikeText: {
    fontSize: 31,
    maxHeight: 31,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '300',
    textAlign: 'center',
  },
  feelsLikeTempText: {
    fontWeight: '100',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
})

var lineGaugeStyles = StyleSheet.create({
  container: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  interval: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  intervalValue: {
    color: '#fff',
  },
  large: {
    backgroundColor: '#fff',
  },
  centerline: {
    backgroundColor: '#50E3C2',
  }
})

export default connect((state) => ({state}), {
  setUnits,
  checkAdCodeExpiration,
  trackAppOpened,
})(App)
