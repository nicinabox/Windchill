const toJSON = r => r.json()

const checkStatus = (r) => {
  if (r.ok) {
    return r
  }

  let error = new Error(r.statusText)
  error.response = r
  throw error
}

export const get = (url, options = {}) => {
  return fetch(url, options).then(checkStatus).then(toJSON)
}
