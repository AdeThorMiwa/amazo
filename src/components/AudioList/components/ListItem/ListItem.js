import React from "react";
import { IconButton, Typography, Box, Hidden } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "./style";
import { DotSeperator } from "../../..";
import thumbnail from "./../../../../assets/img/default.jpg";
import { connect } from "react-redux";
import { openAudioMenu, playAudio } from "../../../../redux/audio/actions";

const ListItem = ({
    idx,
    _id: id,
    title,
    artists,
    playlist,
    openMenu,
    play,
}) => {
    const classes = useStyles();

    return (
        <li
            className={classes.root}
            onDoubleClick={() =>
                play(
                    {
                        id,
                        title,
                        thumbnail,
                        artists,
                    },
                    playlist
                )
            }
        >
            <Hidden smDown>
                <span className={classes.count}>{idx}</span>
            </Hidden>
            <div
                className={classes.thumbnail}
                style={{ backgroundImage: `url(${thumbnail})` }}
            />
            <div className={classes.detail}>
                <Typography variant="h3" className={classes.title}>
                    {title}
                </Typography>
                <div className={classes.extras}>
                    <Typography variant="body2" className={classes.artist}>
                        {artists.length ? artists[0].name : "Unknown Artist"}
                    </Typography>
                    <DotSeperator color="secondary" />
                    <Typography variant="body2" className={classes.duration}>
                        4:34
                    </Typography>
                </div>
            </div>
            <Box position="relative" display="inline-block">
                <IconButton
                    onClick={(e) =>
                        openMenu({
                            id,
                            position: {
                                top: e.pageY,
                                left: e.pageX - 210,
                            },
                        })
                    }
                >
                    <MoreIcon />
                </IconButton>
            </Box>
        </li>
    );
};

const mapDispatchToProps = (dispatch) => ({
    openMenu: (bundle) => dispatch(openAudioMenu(bundle)),
    play: (audio, playlist) => dispatch(playAudio(audio, playlist)),
});

export default connect(null, mapDispatchToProps)(ListItem);
