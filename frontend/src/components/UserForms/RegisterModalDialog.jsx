
import React from 'react';
import Dialog from '@mui/material/Dialog';
import Register from './Register';

const ModalDialog = ({ open, handleClose, switchToLogin }) => {
  return (
    // props received from Sidebar.js
    <div>
    <Dialog open={open} onClose={handleClose}>
      <Register handleClose={handleClose} switchToLogin={switchToLogin} />
    </Dialog>
    </div>
  );
};

export default ModalDialog;