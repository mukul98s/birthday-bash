import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { GlobalContext } from "../State/GlobalState";

const PrivateRouteLogin = ({ children, ...rest }) => {
  const { isLogin } = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={() => {
        return isLogin ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRouteLogin;
