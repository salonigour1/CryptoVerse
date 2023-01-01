import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useData } from "../context";

function CoinsTable() {
  // const [coins, setCoins] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { currency, currSymbol, coins, loading, fetchCoins } = useData();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },

    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "white",
          },
        },
      },
    },
  });
  const style = {
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": { backgroundColor: "black" },
    },
    pagination: {
      width: "100%",
      color: "white",
      fontSize: "3rem",
      padding: "1rem",
      "& .MuiPaginationItem-root": {
        color: "gold",
        fontSize: "1rem",
        padding: "0.3rem",
      },
      "& .MuiPagination-root": {
        width: "50rem",
      },
      display: "flex",
      flexGrow: "1",
      justifyContent: "center",
    },
  };

  const handleSearch = () => {
    var arr = coins;
    if (search) {
      arr = coins.filter(
        (curr) =>
          curr.name.toLowerCase().includes(search) ||
          curr.symbol.toLowerCase().includes(search)
      );
    }

    return arr;
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ width: "70%" }}>
        <Typography
          variant="h4"
          sx={{ margin: "1.5rem", fontFamily: "Montserrat", color: "darkgrey" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          focused
          label="Search For a Currency"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ marginBottom: "1rem", width: "100%", color: "white" }}
        />
        <TableContainer
          sx={{ backgroundColor: "white", width: "100%", margin: "auto" }}
        >
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table sx={{ width: "100%" }}>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow sx={{ height: "3rem" }}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((curr) => (
                    <TableCell
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                      key={curr}
                    >
                      {curr}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((curr) => {
                    const profit = curr.price_change_percentage;
                    return (
                      <TableRow
                        sx={{ ...style.row }}
                        onClick={() => navigate(`/coins/${curr.id}`)}
                        key={curr.id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          styles={{
                            display: "flex",
                            gap: 10,
                            textAlign: "center",
                          }}
                        >
                          <img
                            src={curr?.image}
                            alt={curr.name}
                            height="40"
                            sx={{ marginBottom: 3 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                textTransform: "uppercase",
                                fontSize: "1rem",
                              }}
                            >
                              {curr.symbol}
                            </div>
                            <div style={{ color: "darkgrey" }}>{curr.name}</div>
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          {currSymbol}&nbsp;
                          {curr?.current_price.toFixed(0)}
                        </TableCell>

                        <TableCell
                          sx={{
                            fontSize: "1.2rem",
                            textAlign: "center",
                            color:
                              curr?.price_change_percentage_24h >= 0
                                ? "green"
                                : "red",
                          }}
                        >
                          {curr?.price_change_percentage_24h >= 0 && "+"}
                          {curr?.price_change_percentage_24h?.toFixed(2)}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "1.2rem",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          {currSymbol}&nbsp;
                          {numberWithCommas(
                            curr?.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
          {/*  */}
        </TableContainer>
        <Pagination
          size="4rem"
          variant="outlined"
          shape="rounded"
          sx={{ ...style.pagination }}
          count={Number((handleSearch()?.length / 10).toFixed(0))}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
