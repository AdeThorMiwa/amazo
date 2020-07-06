import types from "./types";
import transformResponse from "../../utils/transformResponse";

export const getAlbumStart = (id) => ({
    type: types.GET_ALBUM_START,
    bundle: id,
});

export const getAlbumSuccess = (bundle) => ({
    type: types.GET_ALBUM_SUCCESS,
    bundle,
});

export const getAlbumFail = (bundle) => ({
    type: types.GET_ALBUM_FAIL,
    ...transformResponse(bundle),
});

export const getAlbumPlaylistStart = (id) => ({
    type: types.GET_ALBUM_PLAYLIST_START,
    bundle: id,
});

export const getAlbumPlaylistSuccess = (bundle) => ({
    type: types.GET_ALBUM_PLAYLIST_SUCCESS,
    bundle,
});

export const getAlbumPlaylistFail = (bundle) => ({
    type: types.GET_ALBUM_PLAYLIST_FAIL,
    ...transformResponse(bundle),
});

export const playAlbum = (playlist) => {
    if (playlist.length) {
        const { _id, title, thumbnail, artists } = playlist[0];

        return {
            type: types.PLAY_ALBUM,
            bundle: {
                audio: {
                    id: _id,
                    title,
                    thumbnail,
                    artists,
                },
                playlist,
            },
        };
    }
    return {
        type: types.PLAY_ALBUM,
        bundle: {
            audio: null,
            playlist: null,
        },
    };
};
