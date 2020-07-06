import { all, call, put, takeLatest } from "redux-saga/effects";
import authTypes from "./types";
import Axios from "./../../utils/axios";
import {
    signupSuccess,
    signupFail,
    signInSuccess,
    signInFail,
} from "./actions";

function* handleSignUp({ bundle }) {
    try {
        const { data } = yield Axios.post(
            "users/signup",
            JSON.stringify(bundle)
        );

        yield put(signupSuccess(data, "Registration Successful!"));
    } catch (e) {
        yield put(signupFail(e));
    }
}

function* handleSignIn({ bundle }) {
    try {
        const { data } = yield Axios.post(
            "users/login",
            JSON.stringify(bundle)
        );
        yield put(signInSuccess(data, "Welcome Back!"));
    } catch (e) {
        yield put(signInFail(e));
    }
}

export function* onSignUp() {
    yield takeLatest(authTypes.SIGN_UP_START, handleSignUp);
}

export function* onSignIn() {
    yield takeLatest(authTypes.SIGN_IN_START, handleSignIn);
}

export function* authSaga() {
    yield all([call(onSignUp), call(onSignIn)]);
}
