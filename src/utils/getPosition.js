import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse'
})

export default () => {
  return new Promise((resolve, reject) => {
    return Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    })
  })
}
