import { deviceTypes, authTypes } from "../types";
import { deviceService } from "../services";

export const deviceActions = {
    add,
    index,
    filter,
    select,
    updateStatus
};

function select(deviceId) {
    return dispatch => {
        dispatch({type: deviceTypes.SELECT, payload: deviceId})
    }
}

function add(fields) {
    return dispatch => {
        dispatch(request());

        deviceService.add(fields)
            .then(
                device => {
                    if (!device.error) {
                        dispatch(success(device));
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };

    function request() {
        return { type: deviceTypes.ADD_REQUEST }
    }
    function success(device) {
        return { type: deviceTypes.ADD_SUCCESS, payload: device }
    }
    function failure() {
        return { type: deviceTypes.ADD_FAILURE }
    }
}

function index(filterQuery) {
    return dispatch => {
        dispatch(request());

        deviceService.index()
            .then(
                devices => {
                    if (devices.error) {
                        dispatch(failure());
                        if (devices.errorStatus === 401) {
                            dispatch({ type: authTypes.LOGOUT });
                        }
                        return;
                    }
                    dispatch(success(devices));
                    dispatch({ type: deviceTypes.FILTER, payload: filterQuery });
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };

    function request() {
        return { type: deviceTypes.INDEX_REQUEST }
    }
    function success(devices) {
        return { type: deviceTypes.INDEX_SUCCESS, payload: devices }
    }
    function failure() {
        return { type: deviceTypes.INDEX_FAILURE }
    }
}

function updateStatus(device, status, filterQuery) {
    return dispatch => {
        dispatch(request());

        deviceService.updateStatus(device, status)
            .then(
                status => {
                    if (!device.error) {
                        dispatch(success(device, status));
                        dispatch({ type: deviceTypes.FILTER, payload: filterQuery });
                    }
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };

    function request() {
        return { type: deviceTypes.UPDATE_STATUS_REQUEST }
    }
    function success(device) {
        return { type: deviceTypes.UPDATE_STATUS_SUCCESS, payload: { device, status } }
    }
    function failure() {
        return { type: deviceTypes.UPDATE_STATUS_FAILURE }
    }
}

function filter(query) {
    return dispatch => {
        dispatch({type: deviceTypes.FILTER, payload: query})
    };
}