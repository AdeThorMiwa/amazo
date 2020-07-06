import React from "react";
import { useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

const RenderView = ({
    xs: Xs,
    sm: Sm,
    md: Md,
    lg: Lg,
    xl: Xl,
    component: Component,
    ...rest
}) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"), {
        defaultMatches: true,
    });

    const isSm = useMediaQuery(theme.breakpoints.down("sm"), {
        defaultMatches: true,
    });

    const isMd = useMediaQuery(theme.breakpoints.down("md"), {
        defaultMatches: true,
    });

    const isLg = useMediaQuery(theme.breakpoints.down("lg"), {
        defaultMatches: true,
    });

    const isXl = useMediaQuery(theme.breakpoints.down("xl"), {
        defaultMatches: true,
    });


    if (isXs && Xs) return <Xs {...rest} />;

    if (isSm && Sm) return <Sm {...rest} />;

    if (isMd && Md) return <Md {...rest} />;

    if (isLg && Lg) return <Lg {...rest} />;

    if (isXl && Xl) return <Xl {...rest} />;

    return <Component {...rest} />;
};

export default RenderView;
