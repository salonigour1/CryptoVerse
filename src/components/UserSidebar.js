import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useData } from "../context";
import { Avatar, useMediaQuery, useTheme } from "@mui/material";
import { Container, styled, width } from "@mui/system";
import { MdDelete } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert, coins, currSymbol, watchlist } = useData();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleLogout = () => {
    signOut(auth);
    setAlert({ open: true, message: "Logged out", type: "success" });
    toggleDrawer();
  };
  const RightContainer = styled("div")(({ theme }) => ({
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
    padding: "0px 20px",
  }));

  const Watchlist = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: "10px",
    padding: "15px",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  }));
  // const theme = useTheme();
  // const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleRemoveFromWacthlist = async (coinDetails) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coinDetails: watchlist.filter((curr) => curr !== coinDetails?.id),
        },
        { merge: "true" }
      );
      setAlert({
        open: true,
        message: "Removed from the watchlist",
        type: "success",
      });
    } catch (error) {
      setAlert({ open: true, message: error, type: "error" });
    }
  };

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              height: 38,
              width: 38,
              backgroundColor: "gold",
              marginLeft: "15px",
              cursor: "pointer",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            PaperProps={{
              sx: {
                width: "24rem",
              },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <RightContainer>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  height: "90%",
                  padding: "20px",
                }}
              >
                <Avatar
                  onClick={toggleDrawer(anchor, true)}
                  sx={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "gold",
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <div
                  style={{
                    width: "100%",
                    fontSize: "1rem",
                    textAlign: "center",
                    fontWeight: "bold",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </div>
                <div>watchlist</div>
                <Watchlist>
                  {coins.map((curr) => {
                    if (watchlist.includes(curr.id))
                      return (
                        <Link
                          to={`/coins/${curr.id}`}
                          style={{
                            display: "flex",
                            color: "black",
                            justifyContent: "space-around",
                            width: "100%",
                            backgroundColor: "gold",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                        >
                          <div style={{ color: "black" }}>{curr.name}</div>
                          <div
                            style={{ display: "flex", gap: 8, color: "black" }}
                          >
                            {currSymbol}{" "}
                            {numberWithCommas(curr.current_price.toFixed(2))}
                          </div>
                          <div>
                            <MdDelete
                              color="red"
                              onClick={() => handleRemoveFromWacthlist(curr)}
                              style={{
                                fontSize: "1.2rem",
                                color: "black",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </Link>
                      );
                  })}
                </Watchlist>
              </div>

              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{ backgroundColor: "gold", margin: "10px" }}
              >
                Log Out
              </Button>
            </RightContainer>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default UserSidebar;
