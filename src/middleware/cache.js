import { setItem } from '../utils/storage'

export default store => next => action => {
  let result = next(action) // eslint-disable-line
  setItem('store', store.getState() || {})
  return result
}
