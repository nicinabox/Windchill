import AsyncStorage from '@react-native-community/async-storage'

const serialize = (value) => {
  return JSON.stringify(value)
}

const deserialize = (value) => {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

export const getItem = (key) => {
  return AsyncStorage.getItem(key)
    .then(deserialize)
}

export const setItem = (key, value) => {
  return AsyncStorage.setItem(key, serialize(value))
}
