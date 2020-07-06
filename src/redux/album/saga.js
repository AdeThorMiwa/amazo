import { all, call, put, takeLatest } from "redux-saga/effects";
import types from "./types";
import Axios from "./../../utils/axios";
import {
    getAlbumSuccess,
    getAlbumFail,
    getAlbumPlaylistStart,
    getAlbumPlaylistSuccess,
    getAlbumPlaylistFail,
} from "./actions";

function* handleGetAlbum({ bundle }) {
    try {
        const { data } = yield Axios.get(`albums/${bundle}`);
        yield put(getAlbumSuccess(data.data.data));
        yield put(getAlbumPlaylistStart(bundle));
    } catch (e) {
        yield put(getAlbumFail(e));
    }
}

function* handleGetAlbumPlaylist({ bundle }) {
    try {
        const { data } = yield Axios.get(`albums/audios/${bundle}`);
        yield put(getAlbumPlaylistSuccess(data.data.data));
    } catch (e) {
        yield put(getAlbumPlaylistFail(e));
    }
}

function* onGetAlbum() {
    yield takeLatest(types.GET_ALBUM_START, handleGetAlbum);
}

function* onGetAlbumPlaylist() {
    yield takeLatest(types.GET_ALBUM_PLAYLIST_START, handleGetAlbumPlaylist);
}

export function* albumSaga() {
    yield all([call(onGetAlbum), call(onGetAlbumPlaylist)]);
}
