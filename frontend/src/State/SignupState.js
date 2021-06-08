import React from "react";

export const SignUpContext = React.createContext();

export const SignUpProvider = ({ children }) => {
  const createUser = async (user) => {
    await fetch("http://localhost:4000/api/v1/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <SignUpContext.Provider value={{ createUser }}>
      {children}
    </SignUpContext.Provider>
  );
};
