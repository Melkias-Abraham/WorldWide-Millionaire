import React, { useContext } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import RegisterModalDialog from "./UserForms/RegisterModalDialog";
import LoginModalDialog from "./UserForms/LoginModalDialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";

import useAuthToggle from "../hooks/useAuthToggle";
import { drawerContext } from "../providers/DrawerProvider";


const drawerWidth = 400;

export default function Navbar() {

    const {handleDrawerToggle } = useContext(drawerContext)

    const {
        openLogin,
        setOpenLogin,
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
        renderMenu
    } = useAuthToggle();


  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Select a continent to continue
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user
              ? [
                  <MenuItem>
                    <Button
                      color="error"
                      onClick={handleLogout}
                      className="logout"
                    >
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
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <RegisterModalDialog
          open={openSignup}
          handleClose={handleSignupClose}
          switchToLogin={setOpenLogin}
        />
        <LoginModalDialog
          open={openLogin}
          switchToSignUp={setOpenSignup}
          handleClose={handleLoginClose}
        />
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
