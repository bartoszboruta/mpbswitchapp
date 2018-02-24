import { dashboardTypes } from "../types";
import { dashboardService } from "../services";

export const dashboardActions = {
    get,
};

function get() {
    return dispatch => {
        dispatch(request());

        dashboardService.get()
            .then(
                summary => {
                    dispatch(success(summary));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    };

    function request() {
        return { type: dashboardTypes.SUMMARY_REQUEST }
    }
    function success(summary) {
        return { type: dashboardTypes.SUMMARY_SUCCESS, payload: summary }
    }
    function failure() {
        return { type: dashboardTypes.SUMMARY_FAILURE }
    }
}
