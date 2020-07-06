import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
    },
    duration: {
        fontSize: 12,
        color: theme.palette.secondary.main,
    },
    playBtn: {
        border: `2px solid ${theme.palette.text.light}`,
        transition: "0.7s",

        "&:hover": {
            borderColor: theme.palette.secondary.main,
        },
    },
    isPlaying: {
        borderColor: theme.palette.secondary.main,
    },
}));

export { useStyles };
