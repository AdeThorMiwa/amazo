import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    rangeRoot: {
        position: "absolute",
        width: "100%",
        top: "-7px",
        zIndex: "-1",
        "-webkit-appearance": "none",
        backgroundColor: "rgba(0,0,0,0)",
        margin: 0,
        color: theme.palette.secondary.main,
        cursor: "pointer",
        outline: "none",
        opacity: 0,
    },
    progress: {
        "& div:nth-child(2)": {
            transition: "none",
        },
    },
}));

export { useStyles };
