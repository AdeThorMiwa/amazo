import types from "./types";

const INITIAL_STATE = {
    currentlyView: {
        album: null,
        playlist: [],
    },
};

const albumReducer = (state = INITIAL_STATE, action) => {
    const { type, bundle } = action;
    switch (type) {
        case types.GET_ALBUM_SUCCESS:
            return {
                ...state,
                currentlyView: {
                    ...state.currentlyView,
                    album: {
                        ...bundle,
                    },
                },
            };
        case types.GET_ALBUM_PLAYLIST_SUCCESS:
            return {
                ...state,
                currentlyView: {
                    ...state.currentlyView,
                    playlist: bundle,
                },
            };
        default:
            return state;
    }
};

export default albumReducer;
