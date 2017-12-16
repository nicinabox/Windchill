import fetchCurrentConditions, { getUrl } from '../../src/utils/fetchCurrentConditions'
import nock from 'nock'
import mockConditions from '../../mocks/conditions.json'
require('isomorphic-fetch')

const { FORECAST_API_KEY } = process.env

describe('fetchCurrentConditions', () => {
  const coords = {
    latitude: 38.897517,
    longitude: -77.036542
  }

  before(() => {
    nock('https://api.forecast.io')
      .get(/forecast.*/)
      .reply(200, mockConditions)
  })

  after(() => {
    nock.restore()
  })

  it('getUrl', () => {
    const expected = `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${Object.values(coords).join(',')}`
    expect(getUrl(coords), 'to equal', expected)
  })

  it('fetches forecast', () => {
    const resp = fetchCurrentConditions(coords, 'us')
    return resp.then((result) => {
      expect(result, 'to have keys', [
        'unitSystem',
        'icon',
        'temperature',
        'windSpeed',
      ])
    })
  })
})
