import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#2b2e30";
const grey = "rgb(32, 33, 36)";
const solid = "#ffffff";
const light = "rgb(218, 220, 224)";

// const darkMode = "#343434"

const text = "rgb(95, 99, 104)";
const primary = "rgb(136, 0, 21)";

export default {
    black,
    white,
    contrast: primary,
    primary: {
        contrastText: text,
        dark: "#ffffff",
        main: solid,
        light: "#ffffff",
    },
    secondary: {
        contrastText: white,
        dark: "#610816",
        main: primary,
        light: "rgba(136, 0, 21, 0.2)",
    },
    success: {
        contrastText: white,
        dark: colors.green[900],
        main: colors.green[600],
        light: colors.green[400],
    },
    info: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue[600],
        light: colors.blue[400],
    },
    warning: {
        contrastText: white,
        dark: colors.orange[900],
        main: colors.orange[600],
        light: colors.orange[400],
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400],
    },
    text: {
        primary: text,
        secondary: grey,
        link: primary,
        light: light,
    },
    background: {
        default: light,
        paper: solid,
    },
    icon: text,
    divider: light,
};
