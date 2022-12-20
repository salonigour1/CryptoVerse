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
function Header() {
  const { data, setData } = useData();
  console.log(data);
  const navigate = useNavigate();

  return (
    <header>
      <div className="header__navbar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar color="transparent" position="static">
            <Container maxWidth="xxl">
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

                <Select
                  defaultValue={"USD"}
                  variant="outlined"
                  style={{
                    width: 120,
                    height: 40,
                    marginLeft: 15,
                    color: "white",
                  }}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
                </Select>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      </div>
      {/* <Button variant="contained"></Button> */}
    </header>
  );
}

export default Header;
