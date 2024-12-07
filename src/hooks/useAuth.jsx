import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isOnBoard,
    isDuplicate,
    coordinate,
    login,
    checkNicknameDuplicate,
    onBoard,
    logout,
    setLocationInfo,
    loading,
    error,
    authAxios,
  } = useContext(AuthContext);

  return {
    user,
    isAuthenticated,
    isOnBoard,
    isDuplicate,
    coordinate,
    login,
    checkNicknameDuplicate,
    onBoard,
    logout,
    setLocationInfo,
    loading,
    error,
    authAxios,
  };
};

export default useAuth;
