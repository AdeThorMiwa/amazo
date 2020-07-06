import authTypes from "./types";
import setAuthToken from "../../utils/setAuthToken";

const INITIAL_STATE = {
    user: null,
    token: null,
    authenticated: false,
    loading: false,
    error: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
    const { type, bundle } = action;
    switch (type) {
        case authTypes.SIGN_UP_START:
        case authTypes.SIGN_IN_START:
            return {
                ...state,
                loading: true,
            };
        case authTypes.SIGN_UP_SUCCESS:
        case authTypes.SIGN_IN_SUCCESS:
            setAuthToken(bundle.token);
            return {
                ...state,
                token: bundle.token,
                user: bundle.data.user,
                authenticated: true,
                loading: false,
                error: false,
            };
        case authTypes.SIGN_UP_FAIL:
        case authTypes.SIGN_IN_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                authenticated: false,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default authReducer;
