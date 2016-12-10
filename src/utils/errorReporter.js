import { Client } from 'bugsnag-react-native'

const mockReporter = {
  notify(err) {
    console.log(err)
  }
}

const client = __DEV__ ? mockReporter : new Client(process.env.BUGSNAG_API_KEY)

export default client
