import { createSelector } from "reselect";

const audio = (state) => state.audio;

export const selectCurrentlyOpened = createSelector(
    [audio],
    (audio) => audio.currentlyOpened
);

export const selectCurrentlyPlaying = createSelector(
    [audio],
    (audio) => audio.currentlyPlaying
);

export const selectCurrentlyOpenedAudio = createSelector(
    [selectCurrentlyOpened],
    (currentlyOpened) => currentlyOpened.audio
);

export const selectCurrentlyOpenedPosition = createSelector(
    [selectCurrentlyOpened],
    (currentlyOpened) => currentlyOpened.position
);

export const selectCurrentlyPlayingAudioId = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.audio && currentlyPlaying.audio.id
);

export const selectCurrentlyPlayingAudio = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.audio
);

export const selectIsPlaying = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.isPlaying
);

export const selectVolume = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.volume
);

export const selectIsMuted = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.isMuted
);

export const selectDuration = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.duration
);

export const selectIsSeeking = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.isSeeking
);

export const selectPlayBackRate = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.playBackRate
);

export const selectLoop = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.loop
);

export const selectShuffle = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.shuffle
);

export const selectError = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.error
);

export const selectPlayed = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.played
);

export const selectLoaded = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.loaded
);

export const selectEnded = createSelector(
    [selectCurrentlyPlaying],
    (currentlyPlaying) => currentlyPlaying.ended
);

// audio

export const selectCurrentView = createSelector(
    [audio],
    (audio) => audio.currentlyView
);

export const selectCurrentViewAudio = createSelector(
    [selectCurrentView],
    (currentView) => currentView.audio
);

export const selectCurrentViewPlaylist = createSelector(
    [selectCurrentView],
    (currentView) => currentView.playlist
);

// export
