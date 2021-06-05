import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContext } from "../State/LoginState";

const PrivateRouteLogin = ({ children, ...rest }) => {
  const { isAuthenthicated, userAccessKey } = useContext(LoginContext);

  const isLogin = isAuthenthicated && userAccessKey !== null;
  return (
    <Route
      {...rest}
      render={() => {
        return userAccessKey !== null ? (
          { children }
        ) : (
          <Redirect to="/login"></Redirect>
        );
      }}
    ></Route>
  );
};
export default PrivateRouteLogin;
