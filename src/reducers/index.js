import { combineReducers } from 'redux'
import settings from './settingsReducer'
import products from './productsReducer'

const reducers = combineReducers({
  settings,
  products,
})

export default function (state, action) {
  return reducers(state, action)
}
