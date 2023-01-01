import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useData } from "../context";
import { Avatar } from "@mui/material";
import { Container, styled, width } from "@mui/system";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });
  const { user, setAlert } = useData();

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
            sx={{ width: "50vh" }}
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
                <Watchlist></Watchlist>
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
