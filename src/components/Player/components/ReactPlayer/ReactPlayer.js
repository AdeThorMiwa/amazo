import React from "react";
import Player from "react-player";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    selectIsPlaying,
    selectLoop,
    selectVolume,
    selectIsMuted,
    selectPlayBackRate,
    selectCurrentlyPlayingAudioId,
    selectIsSeeking,
} from "../../../../redux/audio/selector";
import {
    onProgress,
    onDuration,
    onEnded,
} from "../../../../redux/audio/actions";
import { showSnack } from "../../../../redux/feedback/actions";

const ReactPlayer = ({
    audio,
    reference,
    isPlaying,
    loop,
    volume,
    isMuted,
    playBackRate,
    onEnded,
    onProgress,
    onDuration,
    onError,
}) => (
    <Player
        url={`http://192.168.43.93:5000/api/v1/audios/audio/${audio}`}
        controls
        ref={reference}
        playing={isPlaying}
        loop={loop}
        playbackRate={playBackRate}
        volume={volume}
        muted={isMuted}
        onEnded={onEnded}
        onProgress={onProgress}
        onError={onError}
        onDuration={onDuration}
        style={{ display: "none" }}
    />
);

const mapStateToProps = createStructuredSelector({
    audio: selectCurrentlyPlayingAudioId,
    isPlaying: selectIsPlaying,
    loop: selectLoop,
    volume: selectVolume,
    isMuted: selectIsMuted,
    isSeeking: selectIsSeeking,
    playBackRate: selectPlayBackRate,
});

const mapDispatchToProps = (dispatch) => ({
    onEnded: () => dispatch(onEnded()),
    onProgress: (progress) => dispatch(onProgress(progress)),
    onDuration: (duration) => dispatch(onDuration(duration)),
    onError: () => dispatch(showSnack(null, "Error Loading Audio", "error")),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlayer);
