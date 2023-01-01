import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useData } from "../../context";
import { auth } from "../../firebase";

function Signup({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { alert, setAlert } = useData();
  const handleSubmit = async () => {
    if (password != confirmPassword) {
      console.log("not match");
      setAlert({
        open: true,
        message: "Both Password should match",
        type: "error",
      });
      console.log(alert);
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Sign Up successful.Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: `Please enter correct information`,
        type: "error",
      });
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", p: 4 }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email..."
        value={email}
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        fullWidth
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{ backgroundColor: "gold", fontWeight: "bold" }}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default Signup;
