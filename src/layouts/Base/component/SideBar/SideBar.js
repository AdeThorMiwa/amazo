import React from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { useStyles } from "./style";
import NavBar from "../../../../components/NavBar";

const SideBar = ({ open, toggle }) => {
  const classes = useStyles();

  const toggleDrawer = (to) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    toggle(to);
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      classes={{ paper: classes.drawer }}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div className={classes.root}>
        <NavBar style={{ border: "none" }} />
      </div>
    </SwipeableDrawer>
  );
};

export default SideBar;
