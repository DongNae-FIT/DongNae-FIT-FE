import { useContext } from "react";
import { MyPageContext } from "@/contexts/MyPageContext";

const useMyPage = () => {
  const {
    user,
    authInfo,
    getUserInfo,
    changeNickname,
    changeRegion,
    getProgramSaved,
    getProgramReviewed,
    getMyPost,
    getPostCommented,
    getPostSaved,
    loading,
    error,
  } = useContext(MyPageContext);

  return {
    user,
    authInfo,
    getUserInfo,
    changeNickname,
    changeRegion,
    getProgramSaved,
    getProgramReviewed,
    getMyPost,
    getPostCommented,
    getPostSaved,
    loading,
    error,
  };
};

export default useMyPage;
