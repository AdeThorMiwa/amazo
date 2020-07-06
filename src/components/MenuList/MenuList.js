import React from "react";
import { useStyles } from "./style";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const MenuList = ({ items }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e, title, link, action) => {
    if (action) return action(e);

    if (link) return history.push(link);

    history.push(`/${title.split(" ").join("-").toLowerCase()}`);
  };

  return (
    <ul className={classes.root}>
      {items.map(({ icon: Icon, title, link, action }, i) => (
        <li
          key={i}
          onClick={(e) => handleClick(e, title, link, action)}
          className={classes.listItem}
        >
          <Icon />{" "}
          <Typography variant="body1" component="span">
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
