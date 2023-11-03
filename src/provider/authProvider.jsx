import axios from "axios";
import {createContext, useContext, useEffect, useMemo, useState} from "react";

const AuthContext = createContext(); // creates an empty context object that will share the auth context

const AuthProvider = ({children}) => {
  const [token, setToken_] = useState(localStorage.getItem("token")); // gets token if there is one
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const [userId, setUserId_] = useState(localStorage.getItem("userId") || "");

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUserId = (newUserId) => {
    setUserId_(newUserId);
    localStorage.setItem("userId", newUserId);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userInfo,
      setUserInfo,
      userId,
      setUserId,
    }),
    [token, userInfo, userId]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
