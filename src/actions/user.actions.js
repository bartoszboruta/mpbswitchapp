import { userTypes } from "../types";
import { userService } from "../services";

export const userActions = {
    add,
    edit,
    show
};

function add(fields) {
    return dispatch => {
        dispatch(request());

        userService.add(fields)
            .then(
                user => {
                    console.log(1123)
                    if (!user) {
                        dispatch(failure(user));
                        return;
                    }
                    dispatch(success(user));
                },
                error => {
                    console.log(34321)

                    dispatch(failure(error));
                }
            )
    };

    function request() {
        return { type: userTypes.ADD_REQUEST }
    }
    function success(user) {
        return { type: userTypes.ADD_SUCCESS, payload: user }
    }
    function failure() {
        return { type: userTypes.ADD_FAILURE }
    }
}

function show() {
    return dispatch => {
        dispatch(request());

        userService.show()
            .then(
                user => {
                    if (!user) {
                        dispatch(failure(user));
                        return;
                    }
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };

    function request() {
        return { type: userTypes.GET_REQUEST }
    }
    function success(user) {
        return { type: userTypes.GET_SUCCESS, payload: user }
    }
    function failure() {
        return { type: userTypes.GET_FAILURE }
    }
}

function edit(user) {
    return dispatch => {
        dispatch(request());

        userService.edit(user)
            .then(
                user => {
                    if (!user) {
                        dispatch(failure(user));
                        return;
                    }
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };

    function request() {
        return { type: userTypes.EDIT_REQUEST }
    }
    function success(user) {
        return { type: userTypes.EDIT_SUCCESS, payload: user }
    }
    function failure() {
        return { type: userTypes.EDIT_FAILURE }
    }
}