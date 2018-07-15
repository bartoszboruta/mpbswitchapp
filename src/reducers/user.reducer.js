import { userTypes } from '../types'
import { showMessage, hideMessage } from 'react-native-flash-message'

const initialState = {
  user: {},
  loading: false,
}

export function user(state = initialState, action) {
  switch (action.type) {
    case userTypes.GET_REQUEST:
    case userTypes.EDIT_REQUEST:
      return {
        loading: true,
      }
    case userTypes.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case userTypes.EDIT_SUCCESS:
      showMessage({
        message: 'Profile has been successfully updated',
        type: 'success',
      })
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case userTypes.GET_FAILURE:
    case userTypes.EDIT_FAILURE:
      showMessage({
        message: 'An error occurred while updaing',
        type: 'error',
      })
      return {
        loading: false,
      }
    default:
      return state
  }
}
