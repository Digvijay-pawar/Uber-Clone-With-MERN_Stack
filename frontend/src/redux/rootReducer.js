import { combineReducers } from 'redux';
import userAuthReducer from './auth/user/userAuthReducer';
import captainAuthReducer from './auth/captain/captainAuthReducer';

const rootReducer = combineReducers({
    user: userAuthReducer,
    captain: captainAuthReducer
});

export default rootReducer;