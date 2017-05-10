import omit from 'lodash/omit'

const initialState = {
  products: [],
  purchases: [],
}

import {
  RECEIVE_PRODUCTS,
  PURCHASE_PRODUCT,
  RESTORE_PURCHASES,
  RESET_PURCHASES,
  RECEIVE_AD_CODE,
  RESET_AD_CODE,
  AD_CODE_EXPIRED,
} from '../actions/productActions'

export default function (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.products
      }

    case PURCHASE_PRODUCT:
      return {
        ...state,
        purchases: state.purchases.concat(action.purchase)
      }

    case RESTORE_PURCHASES:
      return {
        ...state,
        purchases: action.purchases
      }

    case RESET_PURCHASES:
      return {
        ...state,
        purchases: initialState.purchases
      }

    case RECEIVE_AD_CODE:
      return {
        ...state,
        adCode: action.adCode
      }

    case RESET_AD_CODE:
    case AD_CODE_EXPIRED:
      return omit(state, 'adCode')

    default:
      return state
  }
}
