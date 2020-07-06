import React, { useState, Fragment } from "react";
import { Avatar, useMediaQuery, ClickAwayListener } from "@material-ui/core";
import { useStyles } from "./style";
import { NavBar } from "../../../../../../components";
import { useTheme } from "@material-ui/styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthenticated } from "../../../../../../redux/auth/selector";

const UserMenu = ({ isAuthenticated }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"), {
        defaultMatches: true,
    });

    const [open, setOpen] = useState(false);
    if (!isAuthenticated) return null;

    return (
        <div className={classes.menuContainer}>
            <Avatar
                onClick={() => setOpen(!open)}
                className={classes.userAvatar}
            />
            {isDesktop && (
                <Fragment>
                    {open && (
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <div>
                                <NavBar style={{ width: 300 }} />
                            </div>
                        </ClickAwayListener>
                    )}
                </Fragment>
            )}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    isAuthenticated: selectAuthenticated,
});

export default connect(mapStateToProps)(UserMenu);
