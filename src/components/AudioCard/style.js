import { styled, Box } from "@material-ui/core";

const boxStyle = {
    width: "100%",
    maxWidth: 280,
    display: "flex",
    flexDirection: "column",
    padding: 8,
};

const topStyle = (theme) => ({
    width: "100%",
    maxHeight: 180,
    height: 180,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(1),
    overflow: "hidden",
});

const thumbnailStyle = {
    width: "100%",
    maxHeight: "100%",
    height: "100%",
    borderRadius: 3,
    backgroundRepeat: "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    transition: "0.6s",
};

const Big = styled(Box)(({ theme }) => ({
    ...boxStyle,

    "& > h3": {
        [theme.breakpoints.down("xs")]: {
            fontSize: 16,
        },
    },

    "& > span": {
        fontSize: 14,
        color: theme.palette.text.light,
    },

    "& .subtitle": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    },

    "&:hover": {
        "& .show-icon": {
            display: "block",
        },
    },

    [theme.breakpoints.down("md")]: {
        maxWidth: 230,
    },

    [theme.breakpoints.down("xs")]: {
        maxWidth: 120,
    },
    "& .top": {
        ...topStyle(theme),

        [theme.breakpoints.down("sm")]: {
            maxWidth: 180,
        },
    },
    "& .moreBtn": {
        position: "absolute",
        top: 0,
        right: 0,
        color: theme.palette.white,
        display: "none",
    },
    "& .thumbnail": {
        ...thumbnailStyle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "&:hover": {
            opacity: 0.8,
        },
    },
    "& .playBtn": {
        fontSize: 48,
        color: theme.palette.white,
    },
}));

const Small = styled(Box)(({ theme }) => ({
    ...boxStyle,
    padding: theme.spacing(1, 0),

    "& > h3": {
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        [theme.breakpoints.down("xs")]: {
            fontSize: 14,
        },
    },

    "& > span": {
        fontSize: 14,
        color: theme.palette.text.light,
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },

    "& .top": {
        ...topStyle(theme),
        maxWidth: 180,

        [theme.breakpoints.down("xs")]: {
            maxWidth: 120,
            height: 120,
        },

        "@media screen and (max-width: 420px)": {
            maxWidth: 100,
            height: 100,
        },
    },
    "& .thumbnail": {
        ...thumbnailStyle,
    },
}));

export { Big, Small };
