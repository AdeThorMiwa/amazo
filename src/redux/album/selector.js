import { createSelector } from "reselect";

const album = (state) => state.album;

export const selectCurrentView = createSelector(
    [album],
    (album) => album.currentlyView
);

export const selectCurrentViewAlbum = createSelector(
    [selectCurrentView],
    (currentView) => currentView.album
);

export const selectCurrentViewPlaylist = createSelector(
    [selectCurrentView],
    (currentView) => currentView.playlist
);
