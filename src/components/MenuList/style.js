import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        listStyle: "none",
        margin: 0,
        padding: theme.spacing(1),
    },

    listItem: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1),
        cursor: "pointer",

        "& span": {
            marginLeft: theme.spacing(4),
            fontWeight: 600,
            [theme.breakpoints.down("xs")]: {
                fontSize: 12,
            },
        },

        "& svg": {
            color: theme.palette.text.primary,
            transition: "color 0.5s",
        },

        "&:hover": {
            "& svg": {
                color: theme.palette.contrast,
            },
        },
    },
}));

export { useStyles };
