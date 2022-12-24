import { ThemeProvider } from "@emotion/react";
import { Button, CircularProgress, styled } from "@mui/material";
import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useData } from "../context";
import chart from "chart.js/auto";
import CustomButton from "./CustomButton";

function CoinInfo({ coinDetails }) {
  const [historcalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const { currency } = useData();
  const fetchData = async (id, days, currency) => {
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    setHistoricalData(data.prices);
    setLoading(false);
    console.log(data.prices);
  };
  useEffect(() => {
    fetchData(id, days, currency);
  }, [currency, days]);

  const chartDays = [
    { label: "24 Hours", value: 1 },
    { label: "30 Days", value: 30 },
    { label: "3 Months", value: 90 },
    { label: "1 Years", value: 360 },
  ];
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const GraphContainer = styled("div")(({ theme }) => ({
    display: "flex",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "borderBox",
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));
  const data = {
    labels: historcalData.map((curr) => {
      let date = new Date(curr[0]);

      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;

      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price ( past ${days} days) in ${currency}`,
        data: historcalData.map((curr) => curr[1]),
        fill: true,
        borderColor: "gold",
        pointRadius: 1,
      },
    ],
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <GraphContainer>
        {loading ? (
          <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Line data={data} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                height: "20%",
              }}
            >
              {chartDays.map((day, index) => (
                <CustomButton
                  day={day}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                  key={index}
                >
                  {day.label}
                </CustomButton>
              ))}
            </div>
          </div>
        )}
      </GraphContainer>
    </ThemeProvider>
  );
}

export default CoinInfo;
