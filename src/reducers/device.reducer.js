import { deviceTypes } from '../types'
import _ from 'lodash'

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
      return {
        ...state,
        devices: _.map(state.devices, device => {
          return device._id === action.payload.device._id
            ? { ...device, name: action.payload.device.name }
            : device
        }),
      }
    case deviceTypes.UPDATE_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
