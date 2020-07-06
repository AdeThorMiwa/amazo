import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    menuContainer: {
        display: "inline-block",
        position: "relative",
    },
    userAvatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        cursor: "pointer",
    },
}));

export { useStyles };
