import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isDuplicate,
    login,
    checkNicknameDuplicate,
    onBoard,
    logout,
    loading,
    error,
  } = useContext(AuthContext);

  return {
    user,
    isAuthenticated,
    isDuplicate,
    login,
    checkNicknameDuplicate,
    onBoard,
    logout,
    loading,
    error,
  };
};

export default useAuth;
