import { deviceTypes } from '../types';
import _ from 'lodash';

const initialState = {
    devices: [],
    filteredDevices: [],
    loading: false,
    selected: {}
};

export function device(state = initialState, action) {
    switch (action.type) {
        case deviceTypes.ADD_SUCCESS:
            return {
                ...state,
                devices: [...state.devices, action.payload],
                loading: false,
            };
        case deviceTypes.FILTER:
            return {
                ...state,
                filteredDevices: _.filter(state.devices, (device) => {
                    return _.includes(_.toUpper(device.name), _.toUpper(action.payload));
                })
            };
        case deviceTypes.INDEX_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case deviceTypes.INDEX_SUCCESS:
            return {
                ...state,
                devices: action.payload,
                loading: false,
            };
        case deviceTypes.INDEX_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case deviceTypes.SELECT:
            return {
                ...state,
                selected: _.filter(state.devices, {_id: action.payload})[0]
            };
        case deviceTypes.UPDATE_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case deviceTypes.UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                devices: _.map(state.devices, (device) => {
                    return device._id === action.payload.device._id ?
                        { ...device, status: {data: action.payload.status} } : device
                }),
                loading: false,
            };
        case deviceTypes.UPDATE_STATUS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}