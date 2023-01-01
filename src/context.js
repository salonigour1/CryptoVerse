import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, createContext, useState, useContext } from "react";
import { auth } from "./firebase";

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [currSymbol, setCurrSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const fetchCoins = async () => {
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR") setCurrSymbol("₹");
    else if (currency === "USD") setCurrSymbol("$");
  }, [currency]);
  return (
    <DataContext.Provider
      value={{
        currency,
        currSymbol,
        setCurrency,
        coins,
        setCoins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export { DataContext, DataProvider };
