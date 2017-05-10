import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import cache from './middleware/cache'
import reducers from './reducers'

let nativeDevTools = global.reduxNativeDevTools
  ? global.reduxNativeDevTools
  : () => f => f

const enhancer = compose(
  applyMiddleware(
    thunk,
    cache
  ),
  nativeDevTools()
)
export default (initialState) => {
  let store = createStore(reducers, initialState, enhancer)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
