const mockPosition = () => {
  return Promise.resolve({
    coords: {
      latitude: '',
      longitude: '',
    }
  })
}

export default () => {
  if (__DEV__) {
    return mockPosition()
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    })
  })
}
