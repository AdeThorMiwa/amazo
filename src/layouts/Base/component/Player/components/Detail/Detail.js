import React from "react";
import { Avatar, useTheme, useMediaQuery } from "@material-ui/core";
import { useStyles } from "./style";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentlyPlayingAudio } from "../../../../../../redux/audio/selector";
import Thumbnail from "./../../../../../../assets/img/default.jpg";

const Detail = ({ audio: { title, artists, thumbnail } }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
        defaultMatches: true,
    });

    return (
        <div className={classes.root}>
            <Avatar
                src={
                    thumbnail && thumbnail !== "thumbnail-default.png"
                        ? thumbnail
                        : Thumbnail
                }
            >
                {title
                    .split(" ")
                    .filter((t, i) => i <= 1)
                    .map((t) => `${t[0].toUpperCase()} `)}
            </Avatar>
            <div>
                <span className="title">
                    {isMobile && title.length > 15
                        ? title.slice(0, 15) + "..."
                        : title}
                </span>
                <span className="subtitle">
                    {artists.length ? artists[0].name : "Unknown artist"}
                </span>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    audio: selectCurrentlyPlayingAudio,
});

export default connect(mapStateToProps)(Detail);
