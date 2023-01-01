import { Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context";
import MuiAlert from "@mui/material/Alert";

function Alert() {
  const { alert, setAlert } = useData();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
}

export default Alert;
