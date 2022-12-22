import React from "react";
import Dle from "./Dle";
import "../style.css";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

function Banner() {
  const style = {
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 25,
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <div className="banner" style={{ height: "30rem" }}>
      <Container maxWidth="xxl" sx={{ ...style.container }}>
        <div className={{ ...style.tagline }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              margin: "15px",
              fontFamily: "Montserrat",
            }}
          >
            CryptoVerse
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: "1.8rem",
            }}
          >
            Get All the Info about your favorite Crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
