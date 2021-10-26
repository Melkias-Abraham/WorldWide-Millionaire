import { useState } from "react";
import Box from "@mui/material/Box";
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import RegisterModalDialog from "./UserForms/RegisterModalDialog";
import LoginModalDialog from "./UserForms/LoginModalDialog";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from '@mui/material/Alert';

const drawerWidth = 400;

export default function Sidebar(props) {
  const {
    continent,
    setStart,
    storage,
    currentUser,
    setCurrentUser,
  } = props;

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [error, setError] = useState(false)

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
    storage.removeItem("user");
    setCurrentUser(null)
  }

  const handleStartGame = () => {
    if(!currentUser) {
      setError(false) 
      return setOpenLogin(true)
    }
    if(!continent){
      return setError(true) 
    }
    setStart("started");
    setError(false) 
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Select a continent to continue
          </Typography>
          {currentUser ? (
            <Button variant="outlined" color="error" onClick={handleLogout} className="logout">
              Logout
            </Button>
          ) : (
            <div className="no-user-buttons">
              <Button
                color="inherit"
                className="login"
                onClick={handleOpenLogin}
              >
                Login
              </Button>
              <Button
                color="inherit"
                className="signup"
                onClick={handleOpenSingup}
              >
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
        <RegisterModalDialog
          open={openSignup}
          handleClose={handleSignupClose}
          switchToLogin={setOpenLogin}
        />
        <LoginModalDialog
          setCurrentUser={setCurrentUser}
          storage={storage}
          open={openLogin}
          switchToSignUp={setOpenSignup}
          handleClose={handleLoginClose}
        />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <div>
            <h3>WorldWide Millionaire 💰 </h3>
          </div>
        </Toolbar>
        <Divider />
        <div>
          <h4>Currently selected:</h4> <p>{continent || "None"}</p>
        </div>
        <div>
          <Button variant="contained" onClick={handleStartGame}>
            Start Game
          </Button>
        </div>
        <div>
        {error && <Alert severity="error">Please select a continent</Alert>}
        </div>
      </Drawer>
    </Box>
  );
}
