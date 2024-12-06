import { useContext } from "react";
import { CommunityContext } from "@/contexts/CommunityContext";

const useCommunity = () => {
  const {
    entirePostList,
    postDetail,
    getEntirePostList,
    getPostDetail,
    togglePostLike,
    togglePostSave,
    saveNewPost,
    deletePost,
    writeComment,
    deleteComment,
    loading,
    error,
  } = useContext(CommunityContext);

  return {
    entirePostList,
    postDetail,
    getEntirePostList,
    getPostDetail,
    togglePostLike,
    togglePostSave,
    saveNewPost,
    deletePost,
    writeComment,
    deleteComment,
    loading,
    error,
  };
};

export default useCommunity;
