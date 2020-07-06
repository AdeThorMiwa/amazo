import React, { useState } from "react";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeMuteIcon from "@material-ui/icons/VolumeOff";
import LoopIcon from "@material-ui/icons/Loop";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import { IconButton, Slider, Box, makeStyles } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import {
    selectLoop,
    selectIsMuted,
    selectVolume,
    selectCurrentlyPlayingAudio,
    selectShuffle,
} from "../../../../redux/audio/selector";
import { createStructuredSelector } from "reselect";
import {
    toggleLoop,
    toggleMute,
    toggleShuffle,
    changeVolume,
    openAudioMenu,
} from "../../../../redux/audio/actions";

const useStyles = makeStyles((theme) => ({
    volumeContainer: {
        display: "flex",
        alignItems: "center",
        borderRadius: 25,
    },
    showContainer: { background: "rgba(136, 0, 21, 0.04)" },
    slider: {
        width: 0,
        verticalAlign: "middle",
        visibility: "hidden",
        transition: "width 0.6s",
    },
    showSlider: {
        visibility: "visible",
        width: 100,
        marginRight: theme.spacing(2),
    },
}));

const Actions = ({
    audio,
    loop,
    mute,
    volume,
    shuffle,
    toggleLoop,
    toggleShuffle,
    toggleMute,
    changeVolume,
    openMenu,
}) => {
    const classes = useStyles();
    const [openVolume, setOpenVolume] = useState(false);

    return (
        <Box display="flex">
            <Box
                onMouseOver={() => setOpenVolume(true)}
                onMouseOut={() => setOpenVolume(false)}
                className={`${classes.volumeContainer} ${
                    openVolume && classes.showContainer
                }`}
            >
                <IconButton
                    color={mute ? "default" : "secondary"}
                    onClick={toggleMute}
                >
                    {mute || volume <= 0 ? (
                        <VolumeMuteIcon />
                    ) : (
                        <VolumeUpIcon />
                    )}
                </IconButton>
                <Slider
                    value={mute ? 0 : volume * 100}
                    onChange={changeVolume}
                    color="secondary"
                    className={`${classes.slider} ${
                        openVolume && classes.showSlider
                    }`}
                    aria-labelledby="volume-slider"
                />{" "}
            </Box>
            <IconButton
                color={loop ? "secondary" : "default"}
                onClick={toggleLoop}
            >
                <LoopIcon />
            </IconButton>
            <IconButton
                onClick={toggleShuffle}
                color={shuffle ? "secondary" : "default"}
            >
                <ShuffleIcon />
            </IconButton>
            <IconButton
                onClick={(e) =>
                    openMenu({
                        audio,
                        position: { left: e.pageX - 210, top: e.pageY - 260 },
                    })
                }
            >
                <MoreIcon />
            </IconButton>
        </Box>
    );
};

const mapStateToProps = createStructuredSelector({
    audio: selectCurrentlyPlayingAudio,
    loop: selectLoop,
    mute: selectIsMuted,
    volume: selectVolume,
    shuffle: selectShuffle,
});

const mapDispatchToProps = (dispatch) => ({
    toggleLoop: () => dispatch(toggleLoop()),
    toggleMute: () => dispatch(toggleMute()),
    toggleShuffle: () => dispatch(toggleShuffle()),
    changeVolume: (e, value) => dispatch(changeVolume(value / 100)),
    openMenu: (bundle) => dispatch(openAudioMenu(bundle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
