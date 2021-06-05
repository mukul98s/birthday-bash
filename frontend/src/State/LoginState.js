import React, { useState } from "react";

export const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
  const [userAccessKey, setUserAccessKey] = useState(null);
  const [isAuthenthicated, setIsAuthethicated] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const authethicateLogin = (body) => {
    fetch("http://localhost:4000/api/v1/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Something Went Wrong");
        }
        return res.json();
      })
      .then((data) => {
        setIsAuthethicated(true);
        setUserAccessKey(data.accessToken);
        setLoginError(null);
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  return (
    <LoginContext.Provider
      value={{ userAccessKey, authethicateLogin, isAuthenthicated, loginError }}
    >
      {children}
    </LoginContext.Provider>
  );
};
