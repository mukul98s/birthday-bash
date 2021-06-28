import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  localStorage.setItem("isLogin", isLogin);

  return (
    <GlobalContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </GlobalContext.Provider>
  );
};
