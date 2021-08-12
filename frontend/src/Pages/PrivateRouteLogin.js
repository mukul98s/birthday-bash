import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRouteLogin = ({ children, ...rest }) => {
  const cookie = document.cookie;

  return (
    <Route
      {...rest}
      render={() => {
        return cookie ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRouteLogin;
