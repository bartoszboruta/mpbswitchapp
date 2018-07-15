import { deviceTypes } from '../types'
import _ from 'lodash'
import { showMessage, hideMessage } from 'react-native-flash-message'

const initialState = {
  devices: [],
  filteredDevices: [],
  filterQuery: '',
  loading: false,
  selected: {},
}

const filterList = (list, query) =>
  list.filter(({ name }) => name.toUpperCase().includes(query.toUpperCase()))

export function device(state = initialState, action) {
  switch (action.type) {
    case deviceTypes.ADD_SUCCESS:
      showMessage({
        message: 'Device has been successfully added',
        type: 'success',
      })

      return {
        ...state,
        devices: [...state.devices, action.payload],
        loading: false,
      }
    case deviceTypes.FILTER:
      return {
        ...state,
        filteredDevices: filterList(state.devices, action.payload),
        filterQuery: action.payload,
      }
    case deviceTypes.REFILTER:
      return {
        ...state,
        filteredDevices: filterList(state.devices, state.filterQuery),
      }
    case deviceTypes.INDEX_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case deviceTypes.INDEX_SUCCESS:
      return {
        ...state,
        devices: action.payload,
        loading: false,
      }
    case deviceTypes.INDEX_FAILURE:
      return {
        ...state,
        loading: false,
      }
    case deviceTypes.SELECT:
      return {
        ...state,
        selected: _.filter(state.devices, { _id: action.payload })[0],
      }
    case deviceTypes.UPDATE_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case deviceTypes.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        devices: _.map(state.devices, device => {
          return device._id === action.payload.device._id
            ? { ...device, status: { data: action.payload.status } }
            : device
        }),
        loading: false,
      }
    case deviceTypes.UPDATE_DATA_SUCCESS:
      showMessage({
        message: 'Device has been successfully updated',
        type: 'success',
      })
      return {
        ...state,
        devices: _.map(state.devices, device => {
          return device._id === action.payload.device._id
            ? { ...device, name: action.payload.device.name }
            : device
        }),
      }
    case deviceTypes.UPDATE_STATUS_FAILURE:
      showMessage({
        message: 'An error occurred while updating device',
        type: 'error',
      })
      return {
        ...state,
        loading: false,
      }
    case deviceTypes.REMOVE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case deviceTypes.REMOVE_SUCCESS:
      showMessage({
        message: 'Device has been successfully deleted',
        type: 'success',
      })
      console.log(
        `device id ${action.payload.device.id} to remove, `,
        _.remove(state.devices, { _id: action.payload.device._id }),
      )
      return {
        ...state,
        devices: _.remove(state.devices, { _id: action.payload.device._id }),
        loading: false,
      }
    case deviceTypes.REMOVE_FAILURE:
      showMessage({
        message: 'An error occurred while deleting device',
        type: 'error',
      })
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
