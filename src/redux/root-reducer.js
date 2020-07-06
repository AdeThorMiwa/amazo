import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// Import all reducers
import auth from "./auth/reducer";
import audio from "./audio/reducer";
import album from "./album/reducer";
import feedback from "./feedback/reducer";

// const persistConfig = {
//     key: "app",
//     storage,
//     auth: [],
// };

export default combineReducers({
    auth,
    audio,
    album,
    feedback,
});

// export default persistReducer(persistConfig, rootReducer);
