import types from "./types";
import transform from "./../../utils/transformResponse";

export const signupStart = (bundle) => ({
    type: types.SIGN_UP_START,
    bundle,
});

export const signupSuccess = (bundle, message) => ({
    type: types.SIGN_UP_SUCCESS,
    ...transform(bundle, message),
});

export const signupFail = (bundle) => ({
    type: types.SIGN_UP_FAIL,
    ...transform(bundle),
});

export const signInStart = (bundle) => ({
    type: types.SIGN_IN_START,
    bundle,
});

export const signInSuccess = (bundle, message) => ({
    type: types.SIGN_IN_SUCCESS,
    ...transform(bundle, message),
});

export const signInFail = (bundle) => ({
    type: types.SIGN_IN_FAIL,
    ...transform(bundle),
});
