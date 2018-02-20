import { userTypes } from '../types';

const initialState = {
    user: {},
    loading: false
};

export function user(state = initialState, action) {
    switch (action.type) {
        case userTypes.GET_REQUEST:
            return {
                loading: true,
            };
        case userTypes.GET_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload
            };
        case userTypes.GET_FAILURE:
            return {
                loading: false,
            };
        default:
            return state;
    }
}