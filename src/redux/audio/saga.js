import { all, call, put, takeLatest } from "redux-saga/effects";
import types from "./types";
import Axios from "./../../utils/axios";
import { getAudioSuccess, getAudioFail } from "./actions";

function* handleAudioPlay({
    bundle: {
        audio: { id },
    },
}) {}

function* onPlayAudio() {
    yield takeLatest(types.PLAY_AUDIO, handleAudioPlay);
}

function* handleGetAudio({ bundle }) {
    try {
        const { data } = yield Axios.get(`audios/${bundle}`);
        yield put(getAudioSuccess(data.data.data));
    } catch (e) {
        yield put(getAudioFail(e));
    }
}

function* onGetAudio() {
    yield takeLatest(types.GET_AUDIO_START, handleGetAudio);
}

export function* audioSaga() {
    yield all([call(onPlayAudio), call(onGetAudio)]);
}
