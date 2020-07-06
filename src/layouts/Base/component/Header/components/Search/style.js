import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    action: {
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        color: theme.palette.text.primary,
        margin: theme.spacing(0, 3),
        "&:hover": {
            color: theme.palette.contrast,
        },

        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(0, 1),
        },
    },
    typo: {
        margin: theme.spacing(0, 2),
        fontWeight: "bolder",

        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    searchBoxContainer: {
        position: "absolute",
        background: theme.palette.text.light,
        left: "0.5%",
        display: "flex",
        height: "90%",
        alignItems: "center",
        color: theme.palette.secondary.main,
        transition: "0.4s",
        width: 0,
        overflow: "hidden",
    },
    backIcon: {
        padding: theme.spacing(3, 2),
    },
    searchBox: {
        flex: 1,
        height: "100%",
        border: "none",
        fontSize: "120%",
        padding: theme.spacing(1),
        background: "inherit",
        boxSizing: "border-box",
        color: "inherit",

        "&:hover, &:focus": {
            border: "none",
            outline: "none",
        },
    },
    openSearch: {
        width: "99%",
    },
}));

export { useStyles };
