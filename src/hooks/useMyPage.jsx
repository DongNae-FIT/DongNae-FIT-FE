import { useContext } from "react";
import { MyPageContext } from "@/contexts/MyPageContext";

const useMyPage = () => {
  const {
    user,
    authInfo,
    getUserInfo,
    changeprofile,
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
    changeprofile,
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
