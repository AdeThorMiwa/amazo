import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(1, 0),
        cursor: "pointer",
        transition: "0.6s",

        "&:hover": {
            background: theme.palette.secondary.light,
        },
    },
    count: {
        color: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(1),
    },
    thumbnail: {
        width: 50,
        height: 50,
        background: theme.palette.secondary.main,
        borderRadius: 4,
        margin: theme.spacing(0, 3),
        backgroundSize: "cover",
        backgroundPosition: "center",

        [theme.breakpoints.down("sm")]: {
            minWidth: 40,
            width: 40,
            height: 40,
            margin: theme.spacing(0, 1),
        },
    },
    detail: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    extras: {
        display: "flex",
    },
    title: {
        fontSize: 16,

        [theme.breakpoints.down("xs")]: {
            fontSize: 14,
            lineHeight: "1.2em",
            fontWeight: "bold"
        },
    },
}));

export { useStyles };
