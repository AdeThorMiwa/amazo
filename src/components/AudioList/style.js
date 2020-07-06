import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        listStyle: "none",
        margin: theme.spacing(8, 0),
        padding: theme.spacing(0, 4),

        [theme.breakpoints.down("sm")]: {
            margin: theme.spacing(4, 0),
            padding: theme.spacing(0),
        },
    },
}));

export { useStyles };
