import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        color: theme.palette.secondary.main,

        "& > div": {
            marginLeft: theme.spacing(2),
            display: "flex",
            flexDirection: "column",

            "& .title": {
                fontWeight: "bold",
                lineHeight: 1.5
            },
            "& .subtitle": {
                fontSize: 12
            }
        },
    },
}));

export { useStyles };
