const toJSON = r => r.json()

export const get = (url, options = {}) => {
  return fetch(url, options).then(toJSON)
}
