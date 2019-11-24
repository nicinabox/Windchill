import { combineReducers } from 'redux'
import settings from './settingsReducer'
import products from './productsReducer'
import analytics from './analyticsReducer'

export default combineReducers({
  settings,
  products,
  analytics,
})
