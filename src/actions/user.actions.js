import { userTypes } from "../types";
import { userService } from "../services";

export const userActions = {
    show
};

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