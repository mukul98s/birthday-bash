import React, { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalState";

export const LoginAuth = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <LoginAuth.Provider value={auth}>{children}</LoginAuth.Provider>;
};

export const useAuth = () => {
  return useContext(LoginAuth);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const { setIsLogin } = useContext(GlobalContext);

  const login = async (userDetails) => {
    const response = await fetch("http://localhost:4000/api/v1/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    }).catch((err) => console.log(err.message));

    const data = await response.json();

    if (data?.error) {
      setUser(false);
    } else {
      setUser(data);
      setIsLogin(true);
    }
  };

  return { user, login };
};
