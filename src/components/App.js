import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as StoreReview from 'react-native-store-review'
import Settings from './Settings'
import IPhoneXSpacer from './IPhoneXSpacer'
import Header from './Header'
import AdBanner from './AdBanner'
import Windchill from './Windchill'
import { setUnits } from '../actions/settingsActions'
import { checkAdCodeExpiration } from '../actions/productActions'
import { trackAppOpened } from '../actions/analyticsActions'

var {
  NativeAppEventEmitter,
  StyleSheet,
  AppState,
  StatusBar,
  Modal,
  View,
} = ReactNative

export class App extends Component {
  constructor(props) {
    super(props)

    this._handleAppStateChange = this._handleAppStateChange.bind(this)
    this._requestReview = debounce(this._requestReview.bind(this), 3000)

    this.state = {
      settingsVisible: false,
    }
  }

  componentDidMount() {
    this.props.checkAdCodeExpiration()
    this.props.trackAppOpened()

    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    NativeAppEventEmitter.removeAllListeners()
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.props.checkAdCodeExpiration()
      this.props.trackAppOpened()
    }
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
    let { shouldShowAds } = this.props.state.settings

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={this.state.settingsVisible ? 'dark-content' : 'light-content'}
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

          <Windchill onChange={this._requestReview} />
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
