import { makeStyles, styled } from "@material-ui/styles";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    appBar: {
        border: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    siteName: {
        color: theme.palette.contrast,
        [theme.breakpoints.down("xs")]: {
            fontSize: 16,
        },
    },
    toolbar: {
        [theme.breakpoints.down("xs")]: {
            padding: 0,
        },
    },
    navigationBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        [theme.breakpoints.down("xs")]: {
            justifyContent: "space-between",
            padding: theme.spacing(1),
        },
    },
    flexGrow: {
        flexGrow: 1,
    },
    menuBtn: {
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1),
        },
    },
}));

const MyLink = styled(NavLink)(({ theme, activeClassName }) => ({
    margin: theme.spacing(0, 3),
    color: theme.palette.text.primary,
    fontWeight: "bold",
    "&:hover": {
        color: theme.palette.contrast,
    },

    ["&." + activeClassName]: {
        color: theme.palette.contrast,
    },

    [theme.breakpoints.down("xs")]: {
        margin: theme.spacing(0, 1),
        fontSize: 13,
    },
}));

export { useStyles, MyLink };
