import React from "react";
import {
    Box,
    Typography,
    Button,
    IconButton,
    Hidden,
    useTheme,
} from "@material-ui/core";
import PlayIcon from "@material-ui/icons/PlayArrow";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "./style";
import Thumbnail from "../../assets/img/bg.jpg";
import DotSeperator from "../DotSeperator";
import Moment from "react-moment";
import { connect } from "react-redux";
import { openAudioMenu, playAudio } from "../../redux/audio/actions";
import { playAlbum } from "../../redux/album/actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentViewPlaylist } from "../../redux/album/selector";

const DetailBox = ({
    audio,
    album,
    albumPlaylist,
    openMenu,
    play,
    playAlbum,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    const Background = ({ style, className, bg, ...rest }) => (
        <Box
            className={`${classes.thumbnail} ${className}`}
            {...rest}
            style={{ backgroundImage: `url(${bg})`, ...style }}
        />
    );

    if (!audio && !album) {
        return "Loading...";
    }

    const { _id, thumbnail, coverImage, title, artists, channel, createdAt } =
        audio || album;

    return (
        <Box className={classes.root}>
            <Box className={classes.container} spacing={4}>
                <Hidden xsDown>
                    <Background
                        bg={
                            thumbnail && thumbnail !== "thumbnail-default.png"
                                ? thumbnail
                                : Thumbnail
                        }
                        className={classes.marginDesktop}
                    />
                </Hidden>
                <Box className={classes.descContainer}>
                    <Typography variant="h1" className={classes.title}>
                        {title}
                    </Typography>
                    <Typography variant="body1" className={classes.desc}>
                        <span>
                            {artists.length
                                ? artists[0].name
                                : "Unknown Artist"}
                        </span>
                        <DotSeperator />
                        <span>{channel.name}</span>
                        <DotSeperator />
                        <span>
                            <Moment fromNow>{createdAt}</Moment>
                        </span>
                    </Typography>
                    <Box paddingTop={2}>
                        <Box paddingRight={1} display="inline-block">
                            <Button
                                onClick={() =>
                                    coverImage
                                        ? playAlbum(albumPlaylist)
                                        : play(
                                              {
                                                  id: _id,
                                                  title,
                                                  thumbnail,
                                                  artists,
                                              },
                                              []
                                          )
                                }
                                color="primary"
                                style={{
                                    color: theme.palette.secondary.main,
                                }}
                                className={classes.btn}
                                variant="contained"
                            >
                                <PlayIcon /> {"Play"}
                            </Button>
                        </Box>
                        <Box paddingRight={1} display="inline-block">
                            <Button
                                color="primary"
                                className={classes.btn}
                                variant="outlined"
                            >
                                Add To Favorite
                            </Button>
                        </Box>
                        <Box position="relative" display="inline-block">
                            <IconButton
                                onClick={(e) =>
                                    openMenu({
                                        id: _id,
                                        position: {
                                            top: e.pageY,
                                            left: e.pageX - 210,
                                        },
                                    })
                                }
                            >
                                <MoreIcon color="primary" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Hidden smUp>
                <Box className={classes.smBg}>
                    <Background bg={thumbnail} />
                </Box>
            </Hidden>
        </Box>
    );
};

const mapStateToProps = createStructuredSelector({
    albumPlaylist: selectCurrentViewPlaylist,
});

const mapDispatchToProps = (dispatch) => ({
    openMenu: (bundle) => dispatch(openAudioMenu(bundle)),
    play: (audio, playlist) => dispatch(playAudio(audio, playlist)),
    playAlbum: (playlist) => dispatch(playAlbum(playlist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailBox);
