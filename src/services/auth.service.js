import { AsyncStorage } from 'react-native';
import { MBP_SWITCH_API_URL } from "../../config";

export const authService = {
    login,
    logout
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    return fetch(MBP_SWITCH_API_URL + '/auth/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return {
                    error: true,
                    errorMessage: response._bodyText
                };
            }

            return response.json();
        })
        .then((auth) => {
            if (auth.success && auth.token && auth.expiresIn) {
                AsyncStorage.setItem('auth', JSON.stringify({token: auth.token, expiresIn: auth.expiresIn}));
            }

            return auth;
        })
        .catch((error) => {
            console.log('error', error);
        });
}

function logout() {
    AsyncStorage.clear();
}