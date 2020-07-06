import React, { useEffect } from "react";
import { Fragment } from "react";
import { DetailBox, MainWrapper, AudioList } from "../../components";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { getAlbumStart } from "../../redux/album/actions";
import {
    selectCurrentViewAlbum,
    selectCurrentViewPlaylist,
} from "../../redux/album/selector";

const AlbumDetail = ({ match, album, playlist, fetchAlbum }) => {
    useEffect(() => {
        fetchAlbum(match.params.album);
    }, [fetchAlbum, match.params.album]);

    return (
        <Fragment>
            <DetailBox album={album} />
            <MainWrapper style={{ marginTop: 0 }}>
                <AudioList playlist={playlist} />
            </MainWrapper>
        </Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    album: selectCurrentViewAlbum,
    playlist: selectCurrentViewPlaylist,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAlbum: (id) => dispatch(getAlbumStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);
