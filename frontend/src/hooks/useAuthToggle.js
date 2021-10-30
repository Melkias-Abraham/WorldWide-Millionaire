import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../providers/AuthProviders";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const useAuthToggle = (setOpenLogin) => {
  const [openSignup, setOpenSignup] = useState(false);

  const { logout, user } = useContext(authContext);


  // menu login/logout items
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // login modal click handlers
  const handleOpenSingup = () => {
    setOpenSignup(true);
  };
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleLoginClose = () => {
    setOpenLogin(false);
  };
  const handleSignupClose = () => {
    setOpenSignup(false);
  };
  const handleLogout = () => {
    logout();
  };

  // responsiveness click handlers
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenLogin}>Log In</MenuItem>
      <MenuItem onClick={handleOpenSingup}>Sign Up</MenuItem>
    </Menu>
  );

  // Responsiveness menu items for mobile
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user
        ? [
            <MenuItem>
              <Button color="error" onClick={handleLogout} className="logout">
                Logout
              </Button>
            </MenuItem>,
          ]
        : [
            <MenuItem>
              <Button
                color="inherit"
                className="login"
                onClick={handleOpenLogin}
              >
                Login
              </Button>
            </MenuItem>,
            <MenuItem>
              <Button
                color="inherit"
                className="signup"
                onClick={handleOpenSingup}
              >
                Signup
              </Button>
            </MenuItem>,
          ]}
    </Menu>
  );

  return {
    user,
    handleLogout,
    handleOpenLogin,
    handleOpenSingup,
    mobileMenuId,
    handleMobileMenuOpen,
    openSignup,
    handleSignupClose,
    setOpenSignup,
    handleLoginClose,
    renderMobileMenu,
    renderMenu,
    handleMobileMenuClose,
  };
};

export default useAuthToggle;
