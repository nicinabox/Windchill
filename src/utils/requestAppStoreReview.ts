import { isAvailable, requestReview } from 'react-native-store-review'

export default function requestAppStoreReview() {
  if (__DEV__) return

  if (isAvailable) {
    setTimeout(() => {
      requestReview()
    }, 2000)
  }
}
