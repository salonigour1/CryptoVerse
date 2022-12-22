import { LinearProgress, Typography } from "@mui/material";
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
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const numberWithCommas = (num) => {
    if (num) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const style = {
    container: {
      padding: "20px",
      display: "flex",
      height: "93vh",
      boxSizing: "borderBox",
      overflow: "hidden",
      // [theme.breakpoints.down("md")]: {
      //   flexDirection: "column",
      //   alignItems: "center",
      //   backgroundColor: "red",
      // },
    },
    sidebar: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 20,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      margin: "20px",
      fontFamily: "Montserrat",
      // padding: "10px",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      fontSize: "1.2rem",
      padding: "0.2rem",
    },
  };
  return (
    <>
      {loading ? (
        <LinearProgress sx={{ backgroundColor: "gold" }} />
      ) : (
        <div style={style.container}>
          <div style={style.sidebar}>
            <img src={coinDetails?.image?.large} />
            <Typography variant="h3" sx={style.heading}>
              {coinDetails?.name}
            </Typography>
            <Typography variant="subtitle1" sx={style.description}>
              {coinDetails?.description?.en.split(". ")[0]}
            </Typography>
            <div style={{ margin: "1rem" }}>
              <Typography
                variant="h4"
                sx={{ display: "inline", ...style.heading }}
              >
                Rank :
              </Typography>

              <Typography variant="h5" sx={{ display: "inline" }}>
                {coinDetails?.market_cap_rank}
              </Typography>
            </div>
            <div style={{ margin: "1rem" }}>
              <Typography
                variant="h4"
                sx={{ display: "inline", ...style.heading }}
              >
                Current Price :
              </Typography>

              <Typography variant="h5" sx={{ display: "inline" }}>
                {currSymbol}&nbsp;
                {numberWithCommas(
                  coinDetails?.market_data?.current_price[
                    currency.toLowerCase()
                  ]
                )}
              </Typography>
            </div>
            <div style={{ margin: "1rem" }}>
              <Typography
                variant="h4"
                sx={{ display: "inline", ...style.heading }}
              >
                Market Cap :
              </Typography>

              <Typography variant="h5" sx={{ display: "inline" }}>
                {currSymbol}&nbsp;
                {numberWithCommas(
                  coinDetails?.market_data?.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </div>
          </div>
          <CoinInfo coinDetails={coinDetails} />
        </div>
      )}
    </>
  );
}

export default CoinDetail;
