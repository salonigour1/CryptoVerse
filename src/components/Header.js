import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./style.css";
import {
  AppBar,
  Box,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { DataContext, useData } from "../context";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./UserSidebar";
function Header() {
  const navigate = useNavigate();
  const { currency, setCurrency, currSymbol, user } = useData();
  console.log(currSymbol);

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" position="static">
          <Container maxWidth="xl">
            <Toolbar
              variant="dense"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography
                onClick={() => navigate("/")}
                sx={{
                  fontWeight: "bold",
                  color: "gold",
                  cursor: "pointer",
                }}
                variant="h3"
              >
                CryptoVerse
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  variant="outlined"
                  style={{
                    width: 80,
                    height: 30,
                    marginLeft: 10,
                    color: "white",
                  }}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
                {/* <AuthModal /> */}
                {user ? <UserSidebar /> : <AuthModal />}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* <Button variant="contained"></Button> */}
    </header>
  );
}

export default Header;
