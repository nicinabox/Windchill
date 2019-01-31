import React, { Component } from 'react'
import ReactNative from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import isIphoneX from '../utils/isIphoneX'
import NavigationBar from 'react-native-navbar'
import ListSpacer from './ListSpacer'
import ContactSettings from './ContactSettings'
import PurchaseSettings from './PurchaseSettings'
import UnitSettings from './UnitSettings'
import { setUnits } from '../actions/settingsActions'
import {
  validateAdCode,
  loadProducts,
  purchaseProduct,
  restorePurchases
} from '../actions/productActions'
import * as colors from '../styles/colors'
import pkg from '../../package.json'

const {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
} = ReactNative

export class Settings extends Component {
  handleDarkSky() {
    Linking.openURL('https://darksky.net/poweredby/')
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          containerStyle={styles.navbarStyle}
          title={{
            title: 'Settings'
          }}
          rightButton={{
            title: 'Done',
            handler: this.props.handleClose
          }}
        />

        <ScrollView
          ref={r => this.scrollView = r}
          style={{flex:1}}>

          {!this.props.state.settings.shouldShowAds && (
            <View style={styles.thanks}>
              {this.props.state.products.adCode ? (
                <Text style={styles.thanksText}>
                  🎉 Enjoy Windchill ad-free until {format(this.props.state.products.adCode.expiration, 'MMM D, YYYY')}!
                </Text>
              ) : (
                <Text style={styles.thanksText}>
                  🎉 Thanks for supporting Windchill!
                </Text>
              )}
            </View>
          )}

          <UnitSettings
            settings={this.props.state.settings}
          />

          <PurchaseSettings
            products={this.props.state.products}
            settings={this.props.state.settings}
            validateAdCode={this.props.validateAdCode}
            loadProducts={this.props.loadProducts}
            purchaseProduct={this.props.purchaseProduct}
            restorePurchases={this.props.restorePurchases}
          />

          <ContactSettings />

          <View style={styles.footer}>
            <Text style={styles.textMuted}>
              v{pkg.version}
              {' • '}
              <Text onPress={this.handleDarkSky}>
                Powered by Dark Sky
              </Text>
            </Text>
          </View>

          <ListSpacer />
        </ScrollView>

        <KeyboardSpacer onToggle={(isOpen) => {
          setTimeout(() => {
            isOpen && this.scrollView.scrollToEnd()
          }, 1)
        }}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingBottom: isIphoneX() ? 24 : 0,
  },
  navbarStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderColor,
    paddingTop: isIphoneX() ? 24 : 0,
  },
  textMuted: {
    color: colors.borderColor
  },
  thanks: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center'
  },
  thanksText: {
    color: colors.brandSuccess,
    fontSize: 16,
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  }
})

export default connect((state) => ({state}), {
  setUnits,
  validateAdCode,
  loadProducts,
  purchaseProduct,
  restorePurchases,
})(Settings)
