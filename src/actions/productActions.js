import { NativeModules, Alert } from 'react-native'
import { isAfter } from 'date-fns'
import { post } from '../utils/http'
import errorReporter from '../utils/errorReporter'
import { PRODUCTS } from '../utils/purchases'

const { InAppUtils } = NativeModules

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const PURCHASE_PRODUCT = 'PURCHASE_PRODUCT'
export const RESTORE_PURCHASES = 'RESTORE_PURCHASES'
export const RESET_PURCHASES = 'RESET_PURCHASES'
export const RECEIVE_AD_CODE = 'RECEIVE_AD_CODE'
export const RESET_AD_CODE = 'RESET_AD_CODE'
export const AD_CODE_EXPIRED = 'AD_CODE_EXPIRED'

const AD_CODE_URL = __DEV__
  ? 'http://localhost:3000/ad_codes'
  : 'https://windchill-api.apps.nicinabox.com/ad_codes'

export function checkAdCodeExpiration() {
  return (dispatch, getState) => {
    const { adCode } = getState().products
    if (adCode && isAfter(new Date, new Date(adCode.expiration))) {
      dispatch({
        type: AD_CODE_EXPIRED
      })
    }
  }
}

export function validateAdCode(code) {
  return (dispatch) => {
    post(AD_CODE_URL, { code })
      .then((adCode) => {
        dispatch({
          type: RECEIVE_AD_CODE,
          adCode
        })
      })
      .catch((err) => {
        let error = err
        if (err.body && err.body.error) {
          error = err.body.error // eslint-disable-line
        }
        Alert.alert(error)
      })
  }
}

export function loadProducts() {
  return (dispatch) => {
    InAppUtils.loadProducts(PRODUCTS, (err, products) => {
      if (err) {
        errorReporter.notify(err.message)
        return Alert.alert(err.message)
      }

      dispatch({
        type: RECEIVE_PRODUCTS,
        products
      })
    })
  }
}

export function purchaseProduct(id) {
  if (__DEV__) {
    return {
      type: PURCHASE_PRODUCT,
      purchase: {
        productIdentifier: id
      }
    }
  }

  return (dispatch) => {
    InAppUtils.purchaseProduct(id, (err, resp) => {
      if (err) {
        errorReporter.notify(err.message)
        return Alert.alert(err.message)
      }

      if (resp && resp.productIdentifier) {
        dispatch({
          type: PURCHASE_PRODUCT,
          purchase: resp
        })
      }
    })
  }
}

export function restorePurchases() {
  return (dispatch) => {
    InAppUtils.restorePurchases((err, resp) => {
      if (err) {
        errorReporter.notify(err, 'Could not restore purchases')
        return Alert.alert('Could not connect to iTunes Store')
      }

      dispatch({
        type: RESTORE_PURCHASES,
        purchases: resp
      })
    })
  }
}
