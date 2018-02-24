import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { user } from './user.reducer';
import { device } from './device.reducer';
import { summary } from './dashboard.reducer';

const rootReducer = combineReducers({
    auth,
    user,
    device,
    summary
});

export default rootReducer;