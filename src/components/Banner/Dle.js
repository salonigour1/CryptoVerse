import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import React, { useState } from "react";

function Dle() {
  const MyThemeComponent = styled("div")(({ theme }) => ({
    color: "red",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));
  return <></>;
}

export default Dle;
