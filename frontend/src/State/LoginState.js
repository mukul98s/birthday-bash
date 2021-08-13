import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constant/baseUrl";
axios.defaults.withCredentials = true;
const axiosConfig = {
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
};

export const LoginAuth = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <LoginAuth.Provider value={auth}>{children}</LoginAuth.Provider>;
};

export const useAuth = () => {
  return useContext(LoginAuth);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const login = async (userDetails) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        userDetails,
        axiosConfig
      );
      if (response.status === 200) {
        setUser(true);
      } else {
        setUser(false);
      }
      console.log(response);
    } catch (error) {
      console.log(
        error.response.data.error.status,
        error.response.data.error.message
      );
    }
  };

  return { user, login };
};
