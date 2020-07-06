import React, { useEffect } from "react";
import { Fragment } from "react";
import { DetailBox, MainWrapper, AudioList } from "../../components";
import { connect } from "react-redux";
import { getAudioStart } from "../../redux/audio/actions";
import { createStructuredSelector } from "reselect";
import {
    selectCurrentViewAudio,
    selectCurrentViewPlaylist,
} from "../../redux/audio/selector";

const AudioDetail = ({ match, audio, playlist, fetchAudio }) => {
    useEffect(() => {
        fetchAudio(match.params.audio);
    }, [fetchAudio, match.params.audio]);

    return (
        <Fragment>
            <DetailBox audio={audio} />
            <MainWrapper style={{ marginTop: 0 }}>
                <AudioList playlist={playlist} />
            </MainWrapper>
        </Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    audio: selectCurrentViewAudio,
    playlist: selectCurrentViewPlaylist,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAudio: (id) => dispatch(getAudioStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioDetail);
