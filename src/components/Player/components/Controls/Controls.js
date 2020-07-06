import React from "react";
import { IconButton, Hidden } from "@material-ui/core";
import PrevIcon from "@material-ui/icons/SkipPrevious";
import NextIcon from "@material-ui/icons/SkipNext";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { useStyles } from "./style";
import { connect } from "react-redux";
import {
    selectPlayed,
    selectDuration,
    selectIsPlaying,
} from "../../../../redux/audio/selector";
import {
    playPause,
    playNext,
    playPrev,
} from "../../../../redux/audio/actions";
import { createStructuredSelector } from "reselect";

const Controls = ({ isPlaying, duration, played, playPause, next, prev }) => {
    const classes = useStyles();

    const format = (seconds) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        let mm = date.getUTCMinutes();
        const ss = ("0" + date.getUTCSeconds()).slice(-2);
        if (hh) {
            mm = ("0" + date.getUTCMinutes()).slice(-2);
            return `${hh}:${mm}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={prev}>
                <PrevIcon />
            </IconButton>
            <IconButton
                onClick={playPause}
                className={`${classes.playBtn} ${
                    isPlaying && classes.isPlaying
                }`}
            >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            <IconButton onClick={next}>
                <NextIcon />
            </IconButton>
            <Hidden smDown>
                <div className={classes.duration}>
                    <time dateTime={`P${Math.round(duration * played)}S`}>
                        {format(duration * played)}
                    </time>{" "}
                    /{" "}
                    <time dateTime={`P${Math.round(duration)}S`}>
                        {format(duration)}
                    </time>
                </div>
            </Hidden>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    played: selectPlayed,
    duration: selectDuration,
    isPlaying: selectIsPlaying,
});

const mapDispatchToProps = (dispatch) => ({
    playPause: () => dispatch(playPause()),
    next: () => dispatch(playNext()),
    prev: () => dispatch(playPrev()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
