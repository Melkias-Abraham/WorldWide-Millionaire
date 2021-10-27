import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import RegisterModalDialog from "./UserForms/RegisterModalDialog";
import LoginModalDialog from "./UserForms/LoginModalDialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import { authContext } from "../providers/AuthProviders";
import Snackbar from "@mui/material/Snackbar";
import { stateContext } from "../providers/StateProvider";

const drawerWidth = 400;

export default function Sidebar(props) {
  const { setStart, window } = props;
  const { logout, user } = useContext(authContext);
  const { state } = useContext(stateContext);

  const continent = state.continent && state.continent.name;

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [sidebarError, setSidebarError] = useState(false);

  // menu login/logut items
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // drawer responiveness
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

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

  // Start game click handlers
  const handleStartGame = () => {
    if (!user) {
      setSidebarError(false);
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
      return setOpenLogin(true);
    }
    if (!continent) {
      return setSidebarError(true);
    }
    setStart("started");
    setSidebarError(false);
  };

  // Responsiveness menu items for mobile
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

  // Responsive drawer
  const drawer = (
    <div>
      <Toolbar>
        <div>
          <h3>WorldWide Millionaire 💰 </h3>
        </div>
      </Toolbar>
      <Divider />
      <div>
        <h4>Currently selected:</h4> <p>{continent || "None"}</p>
      </div>
      <Divider />
      <Toolbar />
      <div>
        <Button variant="contained" onClick={handleStartGame}>
          Start Game
        </Button>
      </div>
      <div>
        {sidebarError && (
          <Alert severity="error" sx={{ m: "40px", width: "70%" }}>
            Select a continent to play.
          </Alert>
        )}
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Snackbar open={openSnackbar} autoHideDuration={6000}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          Please login first.
        </Alert>
      </Snackbar>
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

      {/* {mobile drawer} */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* {desktop draw} */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
