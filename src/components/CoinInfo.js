import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { createTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { useData } from "../context";

function CoinInfo({ coinDetails }) {
  const [historcalData, setHistoricalData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [days, setDays] = useState(365);
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

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const style = {
    container: {
      display: "flex",
      width: "75%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={style.container}>
        {loading ? (
          <CircularProgress sx={{ color: "gold" }} size={250} thickness={1} />
        ) : (
          <Line
            data={{
              labels: historcalData.map((curr) => {
                let date = new Date(curr[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [{ data: historcalData.map((curr) => curr[1]) }],
            }}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;
