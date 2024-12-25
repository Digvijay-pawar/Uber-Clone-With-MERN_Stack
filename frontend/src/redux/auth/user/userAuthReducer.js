import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from './userAuthTypes';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
};

const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
                error: null
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};

export default userAuthReducer;
