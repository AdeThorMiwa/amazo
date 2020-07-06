import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.palette.secondary.main,
        marginTop: theme.spacing(8),
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: "relative",

        [theme.breakpoints.down("xs")]: {
            marginTop: theme.spacing(14),
        },
    },
    container: {
        margin: 0,
        width: "100%",
        padding: theme.spacing(4),
        boxSizing: "border-box",
        display: "flex",

        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0),
        },
    },
    marginDesktop: {
        marginLeft: theme.spacing(4),

        [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
        },
    },
    thumbnail: {
        minWidth: 260,
        background: theme.palette.white,
        minHeight: 260,
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: 3,
        alignSelf: "center",

        [theme.breakpoints.down("sm")]: {
            minWidth: 200,
            minHeight: 200,
            height: 200,
        },
    },
    descContainer: {
        margin: theme.spacing(3),
        zIndex: 1,

        "@media screen and (max-width: 400px)": {
            margin: theme.spacing(1),
        },
    },
    title: {
        fontWeight: 800,
        color: theme.palette.secondary.contrastText,
        textShadow: `0.5px 0.5px 5px`,

        [theme.breakpoints.down("sm")]: {
            fontSize: 24,
        },
    },
    desc: {
        color: theme.palette.text.light,
        margin: theme.spacing(2, 0),
        fontSize: 16,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
    },
    smBg: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        opacity: 0.3,

        "& > div": {
            height: "100%",
        },
    },
    btn: {
        padding: theme.spacing(0.5),
    },
}));

export { useStyles };
