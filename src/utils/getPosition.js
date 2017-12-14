const mockPosition = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        coords: {
          latitude: '',
          longitude: '',
        }
      })
    }, 1000)
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
