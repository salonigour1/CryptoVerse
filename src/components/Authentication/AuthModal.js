import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useData } from "../../context";
import { auth } from "../../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const { setAlert } = useData();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: "Google Sign In successfull!",
          type: "success",
        });
        handleClose();
      })
      .catch((err) => {
        setAlert({
          open: true,
          message: "Google Sign In Failed",
          type: "error",
        });
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: 85,
          height: 30,
          marginLeft: "15px",
          backgroundColor: "gold",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                sx={{ flexDirection: "column" }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  paddingBottom: "20px",
                }}
              >
                OR
              </div>

              <GoogleButton
                onClick={signInWithGoogle}
                style={{ width: "100%", outline: "none" }}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default AuthModal;
