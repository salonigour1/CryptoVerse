import React from "react";
import Dle from "./Dle";
import "../style.css";
import { Container, styled, Typography } from "@mui/material";
import Carousel from "./Carousel";
import banner from "./Banner.jpg";

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
  const Banner = styled("div")(({ theme }) => ({
    height: "20rem",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${banner})`,
  }));
  return (
    <Banner>
      <Container
        maxWidth="xxl"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 25,
        }}
      >
        <div
          className={{
            display: "flex",
            height: "80%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              margin: "10px",
              fontFamily: "Montserrat",
            }}
          >
            CryptoVerse
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get All the Info about your favorite Crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </Banner>
  );
}

export default Banner;
