import { all, call } from "redux-saga/effects";

// Import sagas
import { authSaga } from "./auth/saga";
import { audioSaga } from "./audio/saga";
import { albumSaga } from "./album/saga";

export default function* rootSaga() {
    yield all([call(authSaga), call(audioSaga), call(albumSaga)]);
}
