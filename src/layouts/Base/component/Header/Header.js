import React from "react";
import {
    AppBar,
    Toolbar,
    Hidden,
    IconButton,
    Typography,
    Box,
    useMediaQuery,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import { useStyles, MyLink } from "./style";
import { Search, UserMenu, HideOnScroll } from "./components";
import { useTheme } from "@material-ui/styles";
import SignInSignUp from "./components/SignInSignUp/SignInSignUp";

const Header = ({ openSideBar }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"), {
        defaultMatches: true,
    });

    return (
        <AppBar variant="outlined" className={classes.appBar}>
            <HideOnScroll hide={!isDesktop}>
                <Toolbar className={classes.toolbar}>
                    <Hidden smUp>
                        <IconButton
                            className={classes.menuBtn}
                            onClick={openSideBar}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Link to="/">
                        <Typography variant="h2" className={classes.siteName}>
                            Amazo
                        </Typography>
                    </Link>
                    <Hidden smUp>
                        <div className={classes.flexGrow} />
                    </Hidden>
                    <Hidden xsDown>
                        <Box
                            className={`${classes.navigationBox} ${classes.flexGrow}`}
                        >
                            <MyLink to="/" exact activeClassName="active">
                                Home
                            </MyLink>
                            <MyLink to="/explore" activeClassName="active">
                                Explore
                            </MyLink>
                            <MyLink to="/library" activeClassName="active">
                                Library
                            </MyLink>
                            <Search /> 
                        </Box>
                    </Hidden>
                    <Box className={classes.navigationBox}>
                        <SignInSignUp />
                        <UserMenu />
                    </Box>
                </Toolbar>
            </HideOnScroll>
            <Hidden smUp>
                <Toolbar className={classes.toolbar}>
                    <Box
                        className={`${classes.navigationBox} ${classes.flexGrow}`}
                        style={{ padding: 0 }}
                    >
                        <MyLink to="/" exact activeClassName="active">
                            <HomeIcon />
                        </MyLink>
                        <MyLink to="/explore" activeClassName="active">
                            Explore
                        </MyLink>
                        <MyLink to="/library" activeClassName="active">
                            Library
                        </MyLink>
                        <Search />
                    </Box>
                </Toolbar>
            </Hidden>
        </AppBar>
    );
};

export default Header;
