import { onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { useEffect } from "react";
const ProtectedRoute = () => {
  console.log("protected route");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("changed");
      if (user) {
        console.log("user");
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken != user.accessToken)
          localStorage.setItem("accessToken", user.accessToken);
      }
    });

    return unsubscribe;
  }, [auth]);

  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
