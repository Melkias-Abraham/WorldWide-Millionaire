import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import { authContext } from "../providers/AuthProviders";
import Snackbar from "@mui/material/Snackbar";
import { stateContext } from "../providers/StateProvider";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { drawerContext } from "../providers/DrawerProvider";
import WikiContinent from "./WikiContinent";
import "./Sidebar.css";

const drawerWidth = 450;

export default function Sidebar(props) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sidebarError, setSidebarError] = useState(false);
  const [openSideSnackbar, setOpenSideSnackbar] = useState(false);

  const { window } = props;
  const { user } = useContext(authContext);
  const { state } = useContext(stateContext);
  const history = useHistory();
  const { mobileOpen, handleDrawerToggle } = useContext(drawerContext);

  const continent = state.continent && state.continent.name;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Start game click handlers
  const handleStartGame = () => {
    if (!user) {
      setSidebarError(false);
      setOpenSnackbar(true);

      return setOpenLogin(true);
    }
    if (!continent) {
      setSidebarError(true);
      return setOpenSideSnackbar((prev) => ({
        open: true,
        ...prev,
      }));
    }
    history.push("/game");
    setSidebarError(false);
  };

  // Responsive drawer
  const drawer = (
    <div>
      <Toolbar>
        <div>
          <h3>WorldWide Millionaire 💰 </h3>
        </div>
      </Toolbar>
      <Divider />
      <Toolbar />
      <div>
        <Button variant="contained" onClick={handleStartGame}>
          Start Game
        </Button>
      </div>
      <div>
        {sidebarError && (
          <Snackbar
            open={openSideSnackbar}
            onClose={()=> setOpenSideSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
          >
            <Alert severity="warning" sx={{ width: "100%" }}>
              Select a continent to play.
            </Alert>
          </Snackbar>
        )}
      </div>
      <div className="card-info">
        <WikiContinent />
      </div>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Snackbar open={openSnackbar}  onClose={()=> setOpenSnackbar(false)} autoHideDuration={3000}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          Please login first.
        </Alert>
      </Snackbar>
      <Navbar setOpenLogin={setOpenLogin} openLogin={openLogin} />
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
