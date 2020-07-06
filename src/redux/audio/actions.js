import types from "./types";
import transformResponse from "../../utils/transformResponse";

export const openAudioMenu = (bundle) => ({
    type: types.OPEN_AUDIO_MENU,
    bundle,
});

export const closeAudioMenu = () => ({
    type: types.CLOSE_AUDIO_MENU,
});

export const playAudio = (audio, playlist) => ({
    type: types.PLAY_AUDIO,
    bundle: { audio, playlist },
});

export const playNext = () => ({
    type: types.PLAY_NEXT,
});

export const playPrev = () => ({
    type: types.PLAY_PREV,
});

export const onProgress = (progress) => ({
    type: types.ON_PROGRESS,
    bundle: progress,
});

export const onDuration = (duration) => ({
    type: types.ON_DURATION,
    bundle: duration,
});

export const onEnded = () => ({
    type: types.ON_ENDED,
});

export const onSeekMouseUp = () => ({
    type: types.ON_SEEK_MOUSEUP,
});

export const onSeekMouseDown = () => ({
    type: types.ON_SEEK_MOUSEDOWN,
});

export const onSeekChange = (bundle) => ({
    type: types.ON_SEEK_CHANGE,
    bundle,
});

export const playPause = () => ({
    type: types.PLAY_PAUSE,
});

export const toggleLoop = () => ({
    type: types.TOGGLE_LOOP,
});

export const toggleShuffle = () => ({
    type: types.TOGGLE_SHUFFLE,
});

export const toggleMute = () => ({
    type: types.TOGGLE_MUTE,
});

export const changeVolume = (bundle) => ({
    type: types.CHANGE_VOLUME,
    bundle,
});

export const getAudioStart = (id) => ({
    type: types.GET_AUDIO_START,
    bundle: id,
});

export const getAudioSuccess = (bundle) => ({
    type: types.GET_AUDIO_SUCCESS,
    bundle,
});

export const getAudioFail = (bundle) => ({
    type: types.GET_AUDIO_FAIL,
    ...transformResponse(bundle),
});
