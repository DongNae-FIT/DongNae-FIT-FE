import { useContext } from "react";
import { CommunityContext } from "@/contexts/CommunityContext";

const useCommunity = () => {
  const {
    entirePostList,
    postDetail,
    postId,
    getEntirePostList,
    getPostDetail,
    togglePostLike,
    togglePostSave,
    saveNewPost,
    saveNewPostImg,
    deletePost,
    writeComment,
    deleteComment,
    loading,
    error,
  } = useContext(CommunityContext);

  return {
    entirePostList,
    postDetail,
    postId,
    getEntirePostList,
    getPostDetail,
    togglePostLike,
    togglePostSave,
    saveNewPost,
    saveNewPostImg,
    deletePost,
    writeComment,
    deleteComment,
    loading,
    error,
  };
};

export default useCommunity;
