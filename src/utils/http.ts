const toJSON = (r: Response) => r.json()

const checkStatus = async (r: Response) => {
  if (r.ok) return toJSON(r)

  const body = await toJSON(r)
  const error = new Error(r.statusText)
  error.body = body
  error.response = r

  throw error
}

export const get = async (url: string, options = {}) => {
  const r = await fetch(url, options)
  return checkStatus(r)
}

export const post = async (url: string, body: object, opts = {}) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    },
    method: 'post',
    body: JSON.stringify(body),
    ...opts,
  }

  const r = await fetch(url, options)
  return checkStatus(r)
}
