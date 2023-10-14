import { Typography, Button, Container } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { register } from "../utils";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
export default function Login() {
  const { user } = useContext(AuthContext);
  if (user && localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  const handleLogin = async () => {
    console.log("login");

    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(getAuth(), provider);
    await register({ uid: data.user.uid, displayName: data.user.displayName });
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography>Note App</Typography>
      <Button variant="outlined" onClick={handleLogin}>
        Login with Google
      </Button>
    </Container>
  );
}
