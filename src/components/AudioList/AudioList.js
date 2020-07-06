import React from "react";
import ListItem from "./components/ListItem";
import { useStyles } from "./style";

const AudioList = ({ playlist = [] }) => {
    const classes = useStyles();
    return (
        <ul className={classes.root}>
            {playlist.map((audio, i) => (
                <ListItem key={i} idx={++i} playlist={playlist} {...audio} />
            ))}
        </ul>
    );
};

export default AudioList;
