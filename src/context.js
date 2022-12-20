import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [data, setData] = useState(0);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export { DataContext, DataProvider };
