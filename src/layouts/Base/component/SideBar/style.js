import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
    },
    drawer: {
        width: "80%",
        minWidth: 280,
        [theme.breakpoints.up("md")]: {
            marginTop: 64,
            height: "calc(100% - 64px)",
        },
    },
}));

export { useStyles };
