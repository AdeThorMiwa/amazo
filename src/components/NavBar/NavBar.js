import React from "react";
import { NavBarContainer } from "./style";
import { Avatar, Typography, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuList from "../MenuList";
import menuItems from "./menuItem";

const NavBar = ({ ...rest }) => {
  return (
    <NavBarContainer {...rest}>
      <div className="header"> 
        <Avatar className="user-avatar" />
        <div className="user-info">
          <Typography variant="h3" className="user-name">
            Ade Thor Miwa
          </Typography>
          <Typography className="user-email">Bendamyth@gmail.com</Typography>
          <Link to="/profile">My Profile</Link>
        </div>
      </div>
      <Divider />
      <MenuList items={menuItems.filter((i, idx) => idx <= 3)} />
      <Divider />
      <MenuList items={menuItems.filter((i, idx) => idx >= 4 && idx <= 5)} />
      <Divider />
      <MenuList items={menuItems.filter((i, idx) => idx >= 6)} />
    </NavBarContainer>
  );
};

export default NavBar;
