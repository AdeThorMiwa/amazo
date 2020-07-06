import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(1),
            overflow: "hidden",
        },
    },
    title: {
        textTransform: "capitalize",
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "space-between",

        [theme.breakpoints.down("xs")]: {
            fontSize: 18,
            padding: theme.spacing(1, 0),
        },
    },
}));

export { useStyles };
