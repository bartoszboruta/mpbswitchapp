import { authTypes } from '../types'
import { showMessage, hideMessage } from 'react-native-flash-message'

const initialState = {
  loggedIn: false,
  loading: false,
}

export function auth(state = initialState, action) {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return {
        loading: true,
      }
    case authTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
      }
    case authTypes.LOGIN_FAILURE:
      showMessage({
        message: 'An error occurred while logging in. Try again',
        type: 'error',
      })
      return {
        loggedIn: false,
        loading: false,
      }
    case authTypes.IS_LOGGED:
      return {
        loggedIn: true,
        loading: false,
      }
    case authTypes.LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}
