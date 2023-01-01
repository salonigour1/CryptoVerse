import logo from "./logo.svg";
import "./App.css";
import "./components/style.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinDetail from "./pages/CoinDetail";
import Error from "./pages/Error";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dle from "./components/Banner/Dle";
import Alert from "./components/Alert";

function App() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <div className="App">
          <Alert />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coins/:id" element={<CoinDetail />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
