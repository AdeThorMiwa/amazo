import React, { useState } from "react";
import { Actions, Loader, Detail, Controls, ReactPlayer } from "./components";
import { useStyles } from "./style";
import { Hidden, Box } from "@material-ui/core";
import { useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentlyPlayingAudioId } from "../../redux/audio/selector";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const Player = ({ audio }) => {
    const classes = useStyles();
    let playerRef = useRef();
    const [open, setOpen] = useState(true);
    if (!audio) return null;

    return (
        <div className={classes.root} style={{ height: open ? null : 3 }}>
            <Box className={classes.opener} onClick={() => setOpen(!open)}>
                {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </Box>
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
