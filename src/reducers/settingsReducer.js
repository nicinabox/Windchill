import { getLocaleUnits } from '../utils/unitSystem'
import { shouldShowAds } from '../utils/purchases'
import {
  SET_UNITS,
} from '../actions/settingsActions'
import {
  PURCHASE_PRODUCT,
  RESTORE_PURCHASES,
  RESET_PURCHASES,
  RECEIVE_AD_CODE,
  RESET_AD_CODE,
  AD_CODE_EXPIRED,
} from '../actions/productActions'

const initialState = {
  units: getLocaleUnits(),
  shouldShowAds: true,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_UNITS:
      return {
        ...state,
        units: action.units
      }

    case RECEIVE_AD_CODE:
    case RESET_AD_CODE:
    case AD_CODE_EXPIRED:
      return {
        ...state,
        shouldShowAds: !action.adCode
      }

    case PURCHASE_PRODUCT:
      return {
        ...state,
        shouldShowAds: shouldShowAds([action.purchase])
      }

    case RESTORE_PURCHASES:
      return {
        ...state,
        shouldShowAds: shouldShowAds(action.purchases)
      }

    case RESET_PURCHASES:
      return {
        ...state,
        shouldShowAds: initialState.shouldShowAds
      }

    default:
      return state
  }
}
