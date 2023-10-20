import { Typography, Box, Grid } from "@mui/material";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";
import PushNotification from "../components/PushNotification";
// import { getAuth } from "firebase/auth";
// const auth = getAuth();
// auth.signOut();
import { Response } from "../types";

const Home = () => {
  console.log("home");

  const { folders } = useLoaderData() as Response;

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: "20px", mt: "20px", textAlign: "center" }}
      >
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <UserMenu />
        <PushNotification />
      </Box>
      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        <Grid item xs={3}>
          <FolderList folders={folders && folders} />
        </Grid>
        <Grid item xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
