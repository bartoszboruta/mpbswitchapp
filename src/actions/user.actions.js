import { userTypes } from '../types'
import { userService } from '../services'

add = fields => {
  return dispatch => {
    dispatch({ type: userTypes.ADD_REQUEST })

    userService.add(fields).then(
      user => {
        if (!user) {
          dispatch({ type: userTypes.ADD_FAILURE })
          return
        }
        dispatch({ type: userTypes.ADD_SUCCESS, payload: user })
      },
      error => {
        dispatch({ type: userTypes.ADD_FAILURE })
      },
    )
  }
}

const show = () => {
  return dispatch => {
    dispatch({ type: userTypes.GET_REQUEST })

    userService.show().then(
      user => {
        if (!user) {
          dispatch({ type: userTypes.GET_FAILURE })
          return
        }
        dispatch({ type: userTypes.GET_SUCCESS, payload: user })
      },
      error => {
        dispatch({ type: userTypes.GET_FAILURE })
      },
    )
  }
}

const edit = user => {
  return dispatch => {
    dispatch({ type: userTypes.EDIT_REQUEST })

    userService.edit(user).then(
      user => {
        if (!user) {
          dispatch({ type: userTypes.EDIT_FAILURE })
          return
        }
        dispatch({ type: userTypes.EDIT_SUCCESS, payload: user })
      },
      error => {
        dispatch({ type: userTypes.EDIT_FAILURE })
      },
    )
  }
}

export const userActions = {
  add,
  edit,
  show,
}
