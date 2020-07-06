import React from "react";
import { styled } from "@material-ui/styles";
import { Box } from "@material-ui/core";

const Dot = styled(({ ...rest}) => <Box component="span" {...rest} />)(({ theme, color }) => ({
    background: theme.palette[color].main,
    display: "inline-block",
    height: 3,
    width: 3,
    margin: 8,
    borderRadius: "50%",
}));

const DotSeperator = ({ color = "primary", ...rest }) => (
    <Dot color={color} {...rest} />
);

export default DotSeperator;
