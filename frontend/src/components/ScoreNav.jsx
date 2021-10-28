import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
              <HomeOutlinedIcon  color="action" />
            <Button className={"btn-lead"} color="inherit">
              Home
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
