import { combineReducers } from 'redux'
import settings from './settingsReducer'
import products from './productsReducer'
import analytics from './analyticsReducer'

const reducers = combineReducers({
  settings,
  products,
  analytics,
})

export default function (state, action) {
  return reducers(state, action)
}
