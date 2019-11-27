import { AnyAction } from 'redux'
import { MPH, F, Units } from 'src/utils/units'
import { shouldShowAds } from 'src/utils/purchases'
import { SET_UNITS } from 'src/actions/settingsActions'
import {
  PURCHASE_PRODUCT,
  RESTORE_PURCHASES,
  RESET_PURCHASES,
  RECEIVE_AD_CODE,
  RESET_AD_CODE,
  AD_CODE_EXPIRED,
} from 'src/actions/productActions'

export interface SettingsState {
  units: Units
  shouldShowAds: boolean
}

const initialState: SettingsState = {
  units: {
    speed: MPH,
    temperature: F,
  },
  shouldShowAds: true,
}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_UNITS:
      return {
        ...state,
        units: {
          ...state.units,
          [action.measurement]: action.unit
        }
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
