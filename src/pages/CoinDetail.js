import {
  Box,
  Container,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { useData } from "../context";

function CoinDetail() {
  const [loading, setLoading] = useState(true);
  const [coinDetails, setCoinDetails] = useState({});
  const { currSymbol, currency } = useData();
  const { id } = useParams();
  const fetchDetails = async () => {
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setLoading(false);
    setCoinDetails(data);
    console.log(coinDetails);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const numberWithCommas = (num) => {
    if (num) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // const theme = createTheme({
  //   breakpoints: {
  //     values: {
  //       xs: 0,
  //       sm: 600,
  //       md: 900,
  //       lg: 1200,
  //       xl: 1536,
  //     },
  //   },
  // });
  // const styles = (theme) => ({
  //   con: {
  //     padding: "20px",
  //     display: "flex",
  //     height: "auto",
  //     boxSizing: "borderBox",
  //     overflow: "hidden",
  //     width: "100vw",
  //     backgroundColor: "blue",
  //     // Match [0, md)
  //     //       [0, 900px)
  //     [theme.breakpoints.up("xs")]: {
  //       backgroundColor: "red",
  //     },
  //     [theme.breakpoints.down("sm")]: {
  //       backgroundColor: "green",
  //     },
  //     [theme.breakpoints.down("md")]: {
  //       backgroundColor: "brown",
  //     },
  //     [theme.breakpoints.up("lg")]: {
  //       backgroundColor: "black",
  //     },
  //     [theme.breakpoints.up("xl")]: {
  //       backgroundColor: "yellow",
  //     },
  //   },
  // });
  // const style = {
  //   container: {
  //     padding: "20px",
  //     display: "flex",
  //     height: "auto",
  //     boxSizing: "borderBox",
  //     overflow: "hidden",
  //     width: "100vw",
  //     [theme.breakpoints.up("md")]: {
  //       flexDirection: "column",
  //       alignItems: "center",
  //       backgroundColor: "red",
  //     },
  //   },
  //   sidebar: {
  //     width: "30%",
  //     height: "100%",
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     marginTop: 20,
  //     borderRight: "2px solid grey",
  //   },
  //   heading: {
  //     fontWeight: "bold",
  //     margin: "20px",
  //     fontFamily: "Montserrat",
  //     // padding: "10px",
  //   },
  //   description: {
  //     width: "100%",
  //     fontFamily: "Montserrat",
  //     fontSize: "1.2rem",
  //     padding: "0.2rem",
  //   },
  // };
  const Cointain = styled("div")(({ theme }) => ({
    padding: "20px",
    // height: "90vh",
    boxSizing: "borderBox",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "borderBox",
    overflow: "hidden",
    width: "100vw",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  const Sidebar = styled("div")(({ theme }) => ({
    width: "30%",
    height: "100%",
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20,
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      borderRight: "none",
    },
  }));
  return (
    <>
      {loading ? (
        <LinearProgress sx={{ backgroundColor: "gold" }} />
      ) : (
        <Cointain>
          <Sidebar>
            {console.log(coinDetails?.image)}
            <img src={coinDetails?.image?.large} height="180" />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                margin: "10px",
                fontFamily: "Montserrat",
              }}
            >
              {coinDetails?.name}
            </Typography>
            <Typography
              variant="subtitle4"
              sx={{
                width: "100%",
                fontFamily: "Montserrat",
                fontSize: "1rem",
                padding: "0.2rem",
              }}
            >
              {coinDetails?.description?.en.split(". ")[0]}
            </Typography>
            <div style={{ margin: ".2rem" }}>
              <Typography
                variant="h6"
                sx={{
                  display: "inline",
                  fontWeight: "bold",
                  fontFamily: "Montserrat",
                }}
              >
                Rank :&nbsp;
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ display: "inline", color: "darkgray" }}
              >
                {coinDetails?.market_cap_rank}
              </Typography>
            </div>
            <div style={{ margin: ".1rem" }}>
              <Typography
                variant="h6"
                sx={{
                  display: "inline",
                  fontWeight: "bold",

                  fontFamily: "Montserrat",
                }}
              >
                Current Price :&nbsp;
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ display: "inline", color: "darkgray" }}
              >
                {currSymbol}&nbsp;
                {numberWithCommas(
                  coinDetails?.market_data?.current_price[
                    currency.toLowerCase()
                  ]
                )}
              </Typography>
            </div>
            <div style={{ margin: ".2rem" }}>
              <Typography
                variant="h6"
                sx={{
                  display: "inline",
                  fontWeight: "bold",

                  fontFamily: "Montserrat",
                }}
              >
                Market Cap :&nbsp;
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ display: "inline", color: "darkgray" }}
              >
                {currSymbol}&nbsp;
                {numberWithCommas(
                  coinDetails?.market_data?.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </div>
          </Sidebar>
          <CoinInfo coinDetails={coinDetails} />
        </Cointain>
      )}
    </>
  );
}

export default CoinDetail;
