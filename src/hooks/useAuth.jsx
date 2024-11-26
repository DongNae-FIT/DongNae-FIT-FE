import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuth = () => {
  const { user, isAuthenticated, login, logout, loading, error } =
    useContext(AuthContext);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
    error,
  };
};

export default useAuth;
