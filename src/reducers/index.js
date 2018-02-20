import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { user } from './user.reducer';
import { device } from './device.reducer';

const rootReducer = combineReducers({
    auth,
    user,
    device
});

export default rootReducer;