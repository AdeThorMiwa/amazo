import types from "./types";
import albumTypes from "./../album/types";
import { getNext, getPrev, getNextRandom } from "../../utils/audioActions";

const INITIAL_STATE = {
    currentlyPlaying: {
        audio: null,
        audioData: null,
        playlist: null,

        isPlaying: false,
        volume: 0.8,
        isMuted: false,
        duration: 0,
        isSeeking: false,
        playBackRate: 1.0,
        loop: false,
        shuffle: false,
        error: false,

        played: 0,
        loaded: 0,
        ended: false,
    },
    currentlyOpened: {
        audio: null,
        position: {
            top: 0,
            left: 0,
        },
    },
    currentlyView: {
        audio: null,
        playlist: [],
    },
};

const audioReducer = (state = INITIAL_STATE, action) => {
    const { type, bundle } = action;
    switch (type) {
        case types.OPEN_AUDIO_MENU:
            return {
                ...state,
                currentlyOpened: {
                    ...state.currentlyOpened,
                    audio: bundle.id,
                    position: {
                        ...state.currentlyOpened.position,
                        left: bundle.position.left,
                        top: bundle.position.top,
                    },
                },
            };
        case types.CLOSE_AUDIO_MENU:
            return {
                ...state,
                currentlyOpened: {
                    ...state.currentlyOpened,
                    audio: null,
                    position: {
                        top: 0,
                        left: 0,
                    },
                },
            };
        case types.PLAY_AUDIO:
        case albumTypes.PLAY_ALBUM:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    audio: bundle.audio,
                    playlist: bundle.playlist,
                },
            };
        case types.PLAY_NEXT:
            const next = getNext(
                state.currentlyPlaying.playlist,
                state.currentlyPlaying.audio.id
            );
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    audio: next,
                },
            };
        case types.PLAY_PREV:
            const prev = getPrev(
                state.currentlyPlaying.playlist,
                state.currentlyPlaying.audio.id
            );
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    audio: prev,
                },
            };
        case types.ON_PROGRESS:
            if (state.currentlyPlaying.isSeeking) return state;
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    played: bundle.played,
                    loaded: bundle.loaded,
                },
            };
        case types.ON_DURATION:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    duration: bundle,
                },
            };
        case types.ON_ENDED:
            if (state.currentlyPlaying.loop) {
                return {
                    ...state,
                    currentlyPlaying: {
                        ...state.currentlyPlaying,
                        isPlaying: true,
                    },
                };
            } else if (state.currentlyPlaying.shuffle) {
                let next = getNextRandom(
                    state.currentlyPlaying.playlist,
                    state.currentlyPlaying.audio.id
                );
                return {
                    ...state,
                    currentlyPlaying: {
                        ...state.currentlyPlaying,
                        audio: next,
                    },
                };
            } else {
                let next = getNext(
                    state.currentlyPlaying.playlist,
                    state.currentlyPlaying.audio.id
                );
                return {
                    ...state,
                    currentlyPlaying: {
                        ...state.currentlyPlaying,
                        audio: next,
                    },
                };
            }
        case types.ON_SEEK_MOUSEUP:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    isSeeking: false,
                },
            };
        case types.ON_SEEK_MOUSEDOWN:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    isSeeking: true,
                },
            };
        case types.ON_SEEK_CHANGE:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    played: bundle.played,
                    ended: bundle.ended,
                },
            };
        case types.PLAY_PAUSE:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    isPlaying: !state.currentlyPlaying.isPlaying,
                },
            };
        case types.TOGGLE_LOOP:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    loop: !state.currentlyPlaying.loop,
                },
            };
        case types.TOGGLE_SHUFFLE:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    shuffle: !state.currentlyPlaying.shuffle,
                },
            };
        case types.TOGGLE_MUTE:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    isMuted: !state.currentlyPlaying.isMuted,
                },
            };
        case types.CHANGE_VOLUME:
            return {
                ...state,
                currentlyPlaying: {
                    ...state.currentlyPlaying,
                    volume: bundle,
                },
            };
        case types.GET_AUDIO_SUCCESS:
            return {
                ...state,
                currentlyView: {
                    ...state.currentlyView,
                    audio: {
                        ...bundle,
                    },
                    playlist: [{ ...bundle }],
                },
            };
        default:
            return state;
    }
};

export default audioReducer;
