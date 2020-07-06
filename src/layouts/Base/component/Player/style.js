import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: "flex",
        zIndex: theme.zIndex.appBar,
        boxSizing: "border-box",
        flexShrink: 0,
        flexDirection: "column",
        color: theme.palette.white,
        backgroundColor: theme.palette.primary.main,
        bottom: 0,
        left: "auto",
        right: 0,
        position: "fixed",
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(2),

        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1)
        }
    },
}));

export { useStyles };
