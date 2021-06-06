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
          console.log("Error");
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.error) {
          setIsAuthethicated(true);
          setUserAccessKey(data.accessToken);
          setLoginError(null);
        } else {
          console.log(data.error.message);
          setIsAuthethicated(false);
          setLoginError(data?.error?.message);
        }
      })
      .catch((err) => {
        setIsAuthethicated(false);
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
