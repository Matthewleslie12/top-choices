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
  }; // updates the auth token, updates token state using setToken and stores it in localStorage using setItem

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
  }, [token]); // runs when token is updated
  // if token is null or undefined it will remove the auth heading from axios and localStorage

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
