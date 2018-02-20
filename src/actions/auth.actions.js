import { authTypes } from "../types";
import { authService } from "../services";
import { AsyncStorage } from "react-native";

export const authActions = {
    login,
    logout,
    isLogged
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        authService.login(email, password)
            .then(
                auth => {
                    if (!auth.success) {
                        dispatch(failure(auth));
                        return;
                    }
                    dispatch(success(auth));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };

    function request(auth) {
        return { type: authTypes.LOGIN_REQUEST, payload: auth }
    }
    function success(auth) {
        return { type: authTypes.LOGIN_SUCCESS, payload: auth }
    }
    function failure(auth) {
        return { type: authTypes.LOGIN_FAILURE, payload: auth }
    }
}

function logout() {
    authService.logout();
    return { type: authTypes.LOGOUT };
}

function isLogged() {
    return dispatch => {
        AsyncStorage.getItem('auth').then((auth) => {
            auth = JSON.parse(auth);
            if (auth && auth.token && auth.expiresIn > new Date().getTime() / 1000) {
                dispatch({ type: authTypes.IS_LOGGED });
            } else {
                dispatch({ type: authTypes.LOGIN_FAILURE });
            }
        });
    };
}