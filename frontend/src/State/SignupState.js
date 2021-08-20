import axios from "axios";
import React from "react";
import { BASE_URL } from "../constant/baseUrl";

export const SignUpContext = React.createContext();

export const SignUpProvider = ({ children }) => {
  const createUser = async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, user);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignUpContext.Provider value={{ createUser }}>
      {children}
    </SignUpContext.Provider>
  );
};
