import React from "react";
import { Typography } from "@material-ui/core";
import ThumbnailAudio from "../../assets/img/default1.png";
import ThumbnailAlbum from "../../assets/img/default.jpg";
import { Small as Wrapper } from "./style";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { playAudio } from "../../redux/audio/actions";

const AudioCardSmall = ({
    _id: id,
    title,
    artists,
    thumbnail,
    coverImage,
    playlist,
    play,
}) => {
    const history = useHistory();
    const Thumbnail = coverImage ? ThumbnailAlbum : ThumbnailAudio;

    return (
        <Wrapper>
            <div
                className="top"
                onClick={() =>
                    coverImage
                        ? history.push(`/album/${id}`)
                        : play({ id, title, thumbnail, artists }, playlist)
                }
            >
                <img
                    className="thumbnail"
                    alt="..."
                    src={
                        thumbnail && thumbnail !== "thumbnail-default.png"
                            ? thumbnail
                            : Thumbnail
                    }
                />
            </div>
            <Typography
                variant="h3"
                className={`title`}
                onClick={() =>
                    history.push(`/${coverImage ? "album" : "audio"}/${id}`)
                }
            >
                {title.length > 30 ? title.slice(0, 30) + "..." : title}
            </Typography>
            <span className={`subtitle`}>
                {artists.length ? artists[0].name : "Unknown Artist"}
            </span>
        </Wrapper>
    );
};

const mapDispatchToProps = (dispatch) => ({
    play: (audio, playlist) => dispatch(playAudio(audio, playlist)),
});

export default connect(null, mapDispatchToProps)(AudioCardSmall);
