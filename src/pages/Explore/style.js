import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    topBox: {
        padding: theme.spacing(4, 0, 4, 1),

        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1),
        },
    },
    btn: {
        padding: theme.spacing(2, 6, 2, 1),
        marginLeft: theme.spacing(2),

        "&:first-child": {
            marginLeft: 0,
        },

        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0.5, 1),
        },
    },
}));

export { useStyles };
