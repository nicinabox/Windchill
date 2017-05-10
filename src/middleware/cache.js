import { setItem } from '../utils/storage'

export default store => next => action => {
  let result = next(action)
  console.log(store.getState());
  setItem('store', store.getState() || {})
  return result
}
