import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = (code) => {
    setLoading(true);
    return axios
      .post("주소", { code })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Failed to login:", error);
        window.alert("로그인 실패:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);
    return axios
      .post("주소", {})
      .then(() => {
        localStorage.removeItem("token");
        setUser();
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
