import { AsyncStorage } from 'react-native';

export function headerToken(callback) {
    AsyncStorage.getItem('auth').then((auth) => {
        auth = JSON.parse(auth);
        if (auth && auth.token) {
            let header = { 'Authorization': 'JWT ' + auth.token }
            return callback(header);
        }
    });
}