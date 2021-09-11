import React from "react";
import { Header, BottomNavbar } from "./Components";

const AppShell = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <BottomNavbar />
    </>
  );
};

export default AppShell;
