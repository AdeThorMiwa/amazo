import React from "react";
import { styled } from "@material-ui/core";

const MainTag = ({ children, ...rest }) => <main {...rest}>{children}</main>;

const Wrapper = styled(MainTag)(({ theme }) => ({
    width: "95%",
    margin: "auto",
    marginTop: theme.spacing(8),
    boxSizing: "border-box",

    [theme.breakpoints.down("xs")]: {
        marginTop: 120,
        width: "100%",
    },
}));

const MainWrapper = ({ children, ...rest }) => {
    return <Wrapper {...rest}>{children}</Wrapper>;
};

export default MainWrapper;
