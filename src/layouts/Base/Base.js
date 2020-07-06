import React, { Fragment, useState } from "react";
import { Header, Sidebar, Feedback } from "./component";
import { AudioOptions } from "../../components";
import { useTheme } from "@material-ui/core";

const Base = ({ children }) => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const theme = useTheme();

    const handleSideBarToggle = (val) => setOpenSideBar(val);

    return (
        <div
            style={{
                background: theme.palette.primary.main,
                marginBottom: 80,
            }}
        >
            <Header openSideBar={() => setOpenSideBar(true)} />
            <Sidebar open={openSideBar} toggle={handleSideBarToggle} />
            <Fragment>{children}</Fragment>
            <AudioOptions zIndex={10000} />
            <Feedback />
        </div>
    );
};

export default Base;
