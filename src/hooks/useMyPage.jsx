import { useContext } from "react";
import { MyPageContext } from "@/contexts/MyPageContext";

const useMyPage = () => {
  const { user, getUserInfo, changeNickname, changeRegion, loading, error } =
    useContext(MyPageContext);

  return {
    user,
    getUserInfo,
    changeNickname,
    changeRegion,
    loading,
    error,
  };
};

export default useMyPage;
