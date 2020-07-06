import React from "react";
import { Actions, Loader, Detail, Controls, ReactPlayer } from "./components";
import { useStyles } from "./style";
import { Hidden } from "@material-ui/core";
import { useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentlyPlayingAudioId } from "../../../../redux/audio/selector";

const Player = ({ audio }) => {
    const classes = useStyles();
    let playerRef = useRef();
    if (!audio) return null;

    return (
        <div className={classes.root}>
            <ReactPlayer reference={playerRef} />
            <Loader playerRef={playerRef} />
            <div className={classes.wrapper}>
                <Detail />
                <Controls />
                <Hidden xsDown>
                    <Actions />
                </Hidden>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    audio: selectCurrentlyPlayingAudioId,
});

export default connect(mapStateToProps)(Player);
