import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, createContext, useState, useContext } from "react";
import { auth, db } from "./firebase";

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [currSymbol, setCurrSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data());
          setWatchlist(coin.data().coinDetails);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  // useEffect(() => {
  //   if (user) {
  //     const coinRef = doc(db, "watchlist", user?.uid);

  //     const unsubscribe = onSnapshot(coinRef, (coin) => {
  //       if (coin.exists()) {
  //         console.log(coin.data().coins);
  //         // setWatchlist(coin.data().coins);
  //       } else {
  //         console.log("No coins");
  //       }
  //     });
  //     return () => {
  //       unsubscribe();
  //     };
  //   }
  // }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
        watchlist,
        setWatchlist,
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
