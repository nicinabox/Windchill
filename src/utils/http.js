const toJSON = r => r.json()

const checkStatus = (r) => {
  if (r.ok) return r

  return toJSON(r)
    .then((body) => {
      let error = new Error(r.statusText)
      error.body = body
      error.response = r
      throw error
    })
}

export const get = (url, options = {}) => {
  return fetch(url, options)
    .then(checkStatus)
    .then(toJSON)
}

export const post = (url, body, opts = {}) => {
  let options = {
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(body),
    ...opts,
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(toJSON)
}
