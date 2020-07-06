import React from "react";
import { useStyles } from "./style";
import { LinearProgress, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
    selectPlayed,
    selectLoaded,
} from "../../../../redux/audio/selector";
import {
    onSeekMouseUp,
    onSeekMouseDown,
    onSeekChange,
} from "../../../../redux/audio/actions";

const Loader = ({
    playerRef,
    played,
    loaded,
    onSeekMouseUp,
    onSeekMouseDown,
    onSeekChange,
}) => {
    const seekMouseUp = (e) => {
        onSeekMouseUp();
        playerRef.current.seekTo(parseFloat(e.target.value));
    };

    return (
        <Box position="relative">
            <LinearProgress
                color="secondary"
                variant="buffer"
                value={played * 100}
                valueBuffer={loaded * 100}
                style={{ width: "100%", height: 2 }}
                className={useStyles().progress}
            />
            <input
                type="range"
                min={0}
                max={1}
                value={played}
                step="any"
                onMouseDown={onSeekMouseDown}
                onChange={onSeekChange}
                onMouseUp={seekMouseUp}
                className={useStyles().rangeRoot}
            />
        </Box>
    );
};

const mapStateToProps = createStructuredSelector({
    played: selectPlayed,
    loaded: selectLoaded,
});

const mapDispatchToProps = (dispatch) => ({
    onSeekMouseUp: () => dispatch(onSeekMouseUp()),
    onSeekMouseDown: () => dispatch(onSeekMouseDown()),
    onSeekChange: (e) =>
        dispatch(
            onSeekChange({
                played: parseFloat(e.target.value),
                ended: parseFloat(e.target.value) >= 1,
            })
        ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
