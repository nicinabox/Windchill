import Geolocation from '@react-native-community/geolocation';

export default () => {
  return new Promise((resolve, reject) => {
    return Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    })
  })
}
