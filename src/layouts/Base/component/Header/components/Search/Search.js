import React, { useState } from "react";
import { useStyles } from "./style";
import { Fragment } from "react";
import SearchIcon from "@material-ui/icons/Search";
import BackIcon from "@material-ui/icons/ArrowBack";
import {
    Typography,
    Box,
    IconButton,
    ClickAwayListener,
} from "@material-ui/core";

const Search = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            {open ? (
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                    <Box
                        className={`${classes.searchBoxContainer} ${
                            open ? classes.openSearch : null
                        }`}
                    >
                        <IconButton
                            onClick={() => setOpen(false)}
                            className={classes.backIcon}
                        >
                            <BackIcon />
                        </IconButton>
                        <input type="text" className={classes.searchBox} />
                    </Box>
                </ClickAwayListener>
            ) : null}
            <div className={classes.action} onClick={() => setOpen(true)}>
                <SearchIcon />
                <Typography
                    variant="inherit"
                    className={classes.typo}
                    component="span"
                >
                    {" "}
                    Search
                </Typography>
            </div>
        </Fragment>
    );
};

export default Search;
