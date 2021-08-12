import React, { createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value="Nothing For Now">
      {children}
    </GlobalContext.Provider>
  );
};
