import { NativeModules, Alert } from 'react-native'

const { InAppUtils } = NativeModules
import { PRODUCTS } from '../utils/purchases'

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const PURCHASE_PRODUCT = 'PURCHASE_PRODUCT'
export const RESTORE_PURCHASES = 'RESTORE_PURCHASES'
export const RESET_PURCHASES = 'RESET_PURCHASES'

export function loadProducts() {
  return (dispatch) => {
    InAppUtils.loadProducts(PRODUCTS, (err, products) => {
      if (err) {
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
  return (dispatch) => {
    InAppUtils.purchaseProduct(id, (err, resp) => {
      if (err) {
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
        return Alert.alert('Could not connect to iTunes Store')
      }

      if (resp.length) {
        dispatch({
          type: RESTORE_PURCHASES,
          purchases: resp
        })
      }
    })
  }
}
