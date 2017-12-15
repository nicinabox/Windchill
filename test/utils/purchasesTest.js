import { shouldShowAds, IAP_REMOVEADS_FOREVER } from '../../src/utils/purchases'

describe('shouldShowAds', () => {
  it('should return false when id is in purchases', () => {
    const expected = shouldShowAds([
      { productIdentifier: IAP_REMOVEADS_FOREVER }
    ])

    expect(expected, 'to be', false)
  })

  it('should return true when id is not in purchases', () => {
    const expected = shouldShowAds([])

    expect(expected, 'to be', true)
  })
})
