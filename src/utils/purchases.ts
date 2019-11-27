import * as API from 'src/interfaces/api'

export const IAP_REMOVEADS_FOREVER = 'com.nicinabox.windchill.removeads'
export const IAP_REMOVEADS_YEAR = 'com.nicinabox.windchill.removeads_year'

export const PRODUCTS_IDENTIFIERS = [
  IAP_REMOVEADS_FOREVER,
  IAP_REMOVEADS_YEAR,
]

export const isPurchased = (id: string, purchases: API.Purchase[]) => {
  return purchases.some(p => p.productIdentifier === id)
}

export const shouldShowAds = (purchases: API.Purchase[]) => {
  return !PRODUCTS_IDENTIFIERS.some((id) => isPurchased(id, purchases))
}
