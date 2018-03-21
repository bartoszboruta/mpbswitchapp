import { dashboardTypes } from '../types';

const initialState = {
    summary: {
        data: []
    },
    loading: false
};

export function summary(state = initialState, action) {
    switch (action.type) {
        case dashboardTypes.SUMMARY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case dashboardTypes.SUMMARY_SUCCESS:
            return {
                ...state,
                summary: action.payload,
                loading: false,
            };
        case dashboardTypes.SUMMARY_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}