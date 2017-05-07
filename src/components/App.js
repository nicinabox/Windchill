import React, { Component } from 'react'
import { RevMobManager } from 'react-native-revmob'
import { windchill } from 'weather-tools'
import ReactNative from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import LineGauge from 'react-native-line-gauge'
import CurrentConditions from './CurrentConditions'
import AdSpacer from './AdSpacer'
import Settings from './Settings'
import { US, SI, UNITS, convertTemp, convertSpeed } from '../utils/conversions'
import { setItem } from '../utils/storage'

var {
  NativeAppEventEmitter,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  View,
  Text,
} = ReactNative

const REVMOB_APP_ID = '590de166328d84955c988752'

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

export default class App extends Component {
  constructor(props) {
    super(props)

    this._handleTemperatureChange = this._handleTemperatureChange.bind(this)
    this._handleWindSpeedChange = this._handleWindSpeedChange.bind(this)
    this._handleUnitChange = this._handleUnitChange.bind(this)
    this._handleConditionsPress = this._handleConditionsPress.bind(this)

    let { units } = props.settings

    this.state = {
      settingsVisible: false,
      speed: BOUNDS[units].speed.min,
      temp: BOUNDS[units].temp.max,
      units
    }
  }

  componentDidMount() {
    RevMobManager.startSession(REVMOB_APP_ID, (err) => {
      if (!err) RevMobManager.loadBanner()
    })

    NativeAppEventEmitter.addListener('onRevmobBannerDidReceive', () => {
      !__DEV__ && RevMobManager.showBanner()
    })
  }

  componentWillUnmount () {
    NativeAppEventEmitter.removeAllListeners()
  }

  _calculateWindChill() {
    let { temp, speed, units } = this.state
    speed = speed >= BOUNDS[units].speed.min
      ? speed
      : BOUNDS[units].speed.min

    return windchill[units](temp, speed, false)
  }

  _handleTemperatureChange(temp) {
    this.setState({ temp })
  }

  _handleWindSpeedChange(speed) {
    this.setState({ speed })
  }

  _handleUnitChange(units) {
    if (units === this.state.units) return

    setItem('settings', {
      ...this.props.settings,
      units: this.state.units
    })

    this.setState({
      units,
      speed: Math.round(convertSpeed(this.state.speed, units)),
      temp: Math.round(convertTemp(this.state.temp, units)),
    })
  }

  _handleConditionsPress(currently) {
    this.setState(currently)
  }

  render() {
    let { units, speed, temp } = this.state
    let feelsLike = this._calculateWindChill()

    return (
      <View style={styles.container}>
        <Modal
          transparent={false}
          visible={this.state.settingsVisible}
          animationType="slide">
          <Settings
            handleClose={() => this.setState({ settingsVisible: false })}
            handleUnitChange={this._handleUnitChange}
            units={units}
          />
        </Modal>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => this.setState({ settingsVisible: true })}>
          <Icon name="ios-settings-outline" style={styles.settingsText} />
        </TouchableOpacity>

        <View style={styles.feelsLike}>
          <View>
            <Text style={styles.feelsLikeText}>
              Feels like
            </Text>
            <Text style={styles.feelsLikeTempText}>
              {feelsLike}
            </Text>
          </View>

          <CurrentConditions
            units={units}
            onPress={this._handleConditionsPress}
          />
        </View>

        <View style={styles.controls}>
          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>{speed} {UNITS[units].speed}</Text>
            <LineGauge
              onChange={this._handleWindSpeedChange}
              value={speed}
              {...BOUNDS[units].speed}
            />

            <Text style={styles.linearGaugeLabel}>Wind speed</Text>
          </View>

          <View style={styles.linearGauge}>
            <Text style={styles.linearGaugeValue}>{temp} {UNITS[units].temperature}</Text>
            <LineGauge
              onChange={this._handleTemperatureChange}
              value={temp}
              {...BOUNDS[units].temp}
            />

            <Text style={styles.linearGaugeLabel}>Temperature</Text>
          </View>
        </View>

        <Text style={styles.removeAdsText} onPress={() => this.setState({ settingsVisible: true })}>
          REMOVE ADS
        </Text>

        <AdSpacer height={50} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  removeAdsText: {
    fontSize: 12,
    color: '#4990E2',
    textAlign: 'center',
    padding: 10
  },
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 8,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  settingsText: {
    color: '#666',
    fontSize: 23,
  },
  linearGauge: {
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  linearGaugeValue: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  linearGaugeLabel: {
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
    fontSize: 28,
    maxHeight: 28,
    color: '#4990E2',
    fontWeight: '200',
    textAlign: 'center',
  },
  feelsLikeTempText: {
    fontSize: 124,
    maxHeight: 124,
    fontWeight: '100',
    color: '#4990E2',
    textAlign: 'center',
  },
  errorText: {
    color: '#D13856',
    padding: 30
  }
})
