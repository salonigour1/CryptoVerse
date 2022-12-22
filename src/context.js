import React, { useEffect, createContext, useState, useContext } from "react";

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [currSymbol, setCurrSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setCurrSymbol("₹");
    else if (currency === "USD") setCurrSymbol("$");
  }, [currency]);
  return (
    <DataContext.Provider value={{ currency, currSymbol, setCurrency }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export { DataContext, DataProvider };
