export const IAP_REMOVEADS_FOREVER = 'com.nicinabox.windchill.removeads'
export const IAP_REMOVEADS_YEAR = 'com.nicinabox.windchill.removeads_year'

export const PRODUCTS = [
  IAP_REMOVEADS_FOREVER,
  IAP_REMOVEADS_YEAR,
]

export const isPurchased = (id, purchases) => {
  return purchases.some(p => p.productIdentifier === id)
}

export const shouldShowAds = (purchases) => {
  return !PRODUCTS.some((product) => {
    return isPurchased(product, purchases)
  })
}
