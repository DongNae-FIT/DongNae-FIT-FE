import { useContext } from "react";
import { MyPageContext } from "@/contexts/MyPageContext";

const useMyPage = () => {
  const { user, getUserInfo, loading, error } = useContext(MyPageContext);

  return {
    user,
    getUserInfo,
    loading,
    error,
  };
};

export default useMyPage;
