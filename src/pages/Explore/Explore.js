import React, { Fragment } from "react";
import { AudioCategory } from "../../components";
import { Button, Box } from "@material-ui/core";
import { useStyles } from "./style";

const Explore = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <Box className={classes.topBox}>
                <Button variant="outlined" className={classes.btn} color="secondary">New Release</Button>
                <Button variant="outlined" className={classes.btn} color="secondary">Moods & Genres</Button>
            </Box>
            <AudioCategory title="Recommended Music" />
            <AudioCategory title="Live Performance" />
            <AudioCategory title="For you" />
        </Fragment>
    );
};

export default Explore;
