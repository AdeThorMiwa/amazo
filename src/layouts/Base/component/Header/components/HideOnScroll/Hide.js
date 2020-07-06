import React from "react";
import PropTypes from "prop-types";
import { useScrollTrigger, Slide } from "@material-ui/core";

const HideOnScroll = ({ hide = false, children }) => {
  const trigger = useScrollTrigger();
  if (!hide) return children;

  return (
    <Slide direction="down" mountOnEnter unmountOnExit in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  hide: PropTypes.bool,
};

export default HideOnScroll;
