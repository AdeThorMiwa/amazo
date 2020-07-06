import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import ThumbnailAudio from "../../assets/img/default1.png";
import ThumbnailAlbum from "../../assets/img/default.jpg";
import MoreIcon from "@material-ui/icons/MoreVert";
import PlayIcon from "@material-ui/icons/PlayArrow";
import { Big as Wrapper } from "./style";
import { Link, useHistory } from "react-router-dom";
import DotSeperator from "../DotSeperator";
import { connect } from "react-redux";
import { openAudioMenu, playAudio } from "../../redux/audio/actions";

const AudioCard = ({
    _id: id,
    title,
    thumbnail,
    coverImage,
    artists,
    channel,
    openMenu,
    playlist,
    play,
}) => {
    const open = (e) => {
        e.preventDefault();
        openMenu({ id, position: { top: e.pageY, left: e.pageX - 210 } });
    };

    const Thumbnail = coverImage ? ThumbnailAlbum : ThumbnailAudio;

    const history = useHistory();

    return (
        <Wrapper onContextMenu={open}>
            <div className="top">
                <div
                    className="thumbnail"
                    style={{
                        backgroundImage: `url(${
                            thumbnail && thumbnail !== "thumbnail-default.png"
                                ? thumbnail
                                : Thumbnail
                        })`,
                    }}
                >
                    <IconButton
                        onClick={() =>
                            coverImage
                                ? history.push(`/album/${id}`)
                                : play(
                                      { id, title, thumbnail, artists },
                                      playlist
                                  )
                        }
                        className={`playBtn show-icon`}
                    >
                        <PlayIcon style={{ fontSize: "inherit" }} />
                    </IconButton>
                </div>
                <IconButton onClick={open} className={`moreBtn show-icon`}>
                    <MoreIcon />
                </IconButton>
            </div>
            <Link to={`/${coverImage ? "album" : "audio"}/${id}`}>
                <Typography variant="h3" className={`title`}>
                    {title}
                </Typography>
            </Link>
            <span className={`subtitle`}>
                {artists.length ? artists[0].name : "Unknown Artist"}{" "}
                <DotSeperator color="secondary" />
                {channel && channel.name}
            </span>
        </Wrapper>
    );
};

const mapDispatchToProps = (dispatch) => ({
    openMenu: (bundle) => dispatch(openAudioMenu(bundle)),
    play: (audio, playlist) => dispatch(playAudio(audio, playlist)),
});

export default connect(null, mapDispatchToProps)(AudioCard);
