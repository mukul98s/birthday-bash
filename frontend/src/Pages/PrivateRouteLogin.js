import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { GlobalContext } from "../State/GlobalState";

const PrivateRouteLogin = ({ children, ...rest }) => {
  const { isLogin } = useContext(GlobalContext);
  const local = localStorage.getItem("isLogin");
  console.log(local);

  return (
    <Route
      {...rest}
      render={() => {
        return local ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRouteLogin;
