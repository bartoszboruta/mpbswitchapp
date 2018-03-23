import { AsyncStorage } from 'react-native';
import { MBP_SWITCH_API_URL } from "../../config";

export const userService = {
    add,
    show,
    edit,
};

async function add(fields) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: fields.email,
            name: fields.name,
            password: fields.password,
        })
    };


    return fetch(MBP_SWITCH_API_URL + '/api/v1/user/', requestOptions)
        .then(response => {
            if (!response.ok) {
                return {
                    error: true,
                    errorMessage: response._bodyText,
                    errorStatus: response.status
                };
            }

            return response.json();
        })
        .then((user) => {
            return user;
        })
        .catch((error) => {
            console.log('error', error);
        });
}

async function show() {
    let auth = await AsyncStorage.getItem('auth');
    if (!auth) {
        return {
            error: true,
            errorMessage: 'Unauthorized',
            errorStatus: 401
        };
    }
    auth = JSON.parse(auth);

    const token = auth.token;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    };
    return fetch(MBP_SWITCH_API_URL + '/api/v1/user/', requestOptions)
        .then(response => {
            if (!response.ok) {
                return {
                    error: true,
                    errorMessage: response._bodyText,
                    errorStatus: response.status
                };
            }

            return response.json();
        })
        .then((user) => {
            return user;
        })
        .catch((error) => {
            console.log('error', error);
        });
}

async function edit(user) {
    let auth = await AsyncStorage.getItem('auth');
    if (!auth) {
        return {
            error: true,
            errorMessage: 'Unauthorized',
            errorStatus: 401
        };
    }
    auth = JSON.parse(auth);

    const token = auth.token;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: user.email,
            name: user.name,
        })
    };
    return fetch(MBP_SWITCH_API_URL + '/api/v1/user', requestOptions)
        .then(response => {
            if (!response.ok) {
                return {
                    error: true,
                    errorMessage: response._bodyText,
                    errorStatus: response.status
                };
            }

            return response.json();
        })
        .then((user) => {
            return user;
        })
        .catch((error) => {
            console.log('error', error);
        });
}