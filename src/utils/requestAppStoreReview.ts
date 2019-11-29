import { isAvailable, requestReview } from 'react-native-store-review'

export default function requestAppStoreReview() {
  if (isAvailable) {
    requestReview()
  }
}
