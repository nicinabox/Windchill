import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { debounce } from 'lodash'
import * as StoreReview from 'react-native-store-review'
import Settings from './Settings'
import Header from './Header'
import AdBanner from './AdBanner'
import Windchill from './Windchill'
import { checkAdCodeExpiration } from '../actions/productActions'
import { trackAppOpened } from '../actions/analyticsActions'

var {
  NativeAppEventEmitter,
  StyleSheet,
  AppState,
  StatusBar,
  Modal,
  ImageBackground,
  SafeAreaView,
} = ReactNative

const backgroundGradient = require('../images/background-gradient.png')

export class App extends Component {
  constructor(props) {
    super(props)

    this.handleAppStateChange = this.handleAppStateChange.bind(this)
    this.requestReview = debounce(this.requestReview.bind(this), 3000)
    this.toggleModal = this.toggleModal.bind(this)

    this.state = {
      settingsVisible: false,
    }
  }

  componentDidMount() {
    this.props.checkAdCodeExpiration()
    this.props.trackAppOpened()

    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount () {
    NativeAppEventEmitter.removeAllListeners()
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.props.checkAdCodeExpiration()
      this.props.trackAppOpened()
    }
  }

  shouldRequestReview() {
    return this.props.state.analytics.opens >= 5
  }

  requestReview() {
    if (StoreReview.isAvailable && this.shouldRequestReview()) {
      StoreReview.requestReview()
    }
  }

  toggleModal() {
    this.setState({ settingsVisible: !this.state.settingsVisible })
  }

  render() {
    let { shouldShowAds } = this.props.state.settings

    return (
      <ImageBackground source={backgroundGradient} style={{width: '100%', height: '100%'}}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            barStyle={this.state.settingsVisible ? 'dark-content' : 'light-content'}
          />

          <Modal
            transparent={false}
            visible={this.state.settingsVisible}
            onRequestClose={this.toggleModal}
            animationType="slide">
            <Settings handleClose={this.toggleModal} />
          </Modal>

          <Header onSettingsPress={this.toggleModal} />

          <Windchill onChange={this.requestReview} />

          <AdBanner shouldShowAds={shouldShowAds} />
        </SafeAreaView>
      </ImageBackground>
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
})

export default connect((state) => ({state}), {
  checkAdCodeExpiration,
  trackAppOpened,
})(App)
