export const IAP_REMOVEADS = 'com.nicinabox.windchill.removeads'

export const PRODUCTS = [
  IAP_REMOVEADS
]

export const isPurchased = (id, purchases) => {
  return purchases.some(p => p.productIdentifier === id)
}

export const shouldShowAds = (purchases) => {
  return !isPurchased(IAP_REMOVEADS, purchases)
}
