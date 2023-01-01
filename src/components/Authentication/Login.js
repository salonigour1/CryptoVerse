import { async } from "@firebase/util";
import { Button, TextField, Box } from "@mui/material";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useData } from "../../context";
import { auth } from "../../firebase";

function Login({ handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = useData();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please enter email and passowrd",
        type: "error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      //   console.log(result.user);

      setAlert({
        open: true,
        message: "Logged In successfully!",
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: "Please Enter correct Information",
        type: "error",
      });
      handleClose();
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

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{ backgroundColor: "gold", fontWeight: "bold" }}
      >
        Login
      </Button>
    </Box>
  );
}

export default Login;
