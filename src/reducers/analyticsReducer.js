import { APP_OPENED } from '../actions/analyticsActions'

const initialState = {
  opens: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case APP_OPENED:
      return {
        opens: state.opens + 1
      }

    default:
      return state
  }
}
