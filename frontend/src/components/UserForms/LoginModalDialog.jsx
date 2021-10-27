import React from "react";
import Dialog from "@mui/material/Dialog";
import Login from "./Login";

const LoginModalDialog = ({
  open,
  handleClose,
  switchToSignUp,
}) => {
  return (
    // props received from Sidebar.js
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Login
          handleClose={handleClose}
          switchToSignUp={switchToSignUp}
        />
      </Dialog>
    </div>
  );
};

export default LoginModalDialog;
