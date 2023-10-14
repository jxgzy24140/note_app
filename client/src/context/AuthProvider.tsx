import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const unsubcribed = auth.onIdTokenChanged((user: any) => {
      if (user) {
        setUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        navigate("/");
      } else {
        setUser({});
        localStorage.clear();
        navigate("/login");
      }
    });
    return () => unsubcribed();
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
