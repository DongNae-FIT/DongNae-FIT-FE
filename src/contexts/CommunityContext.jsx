import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const CommunityContext = createContext();

const CommunityProvider = ({ children }) => {
  const [entirePostList, setEntirePostList] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [postId, setPostId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authAxios } = useContext(AuthContext);

  const getEntirePostList = async (searchInput = "") => {
    setLoading(true);
    setError(null);
    try {
      setEntirePostList([]);
      const response = await authAxios.get(`/api/posts?search=${searchInput}`);
      setEntirePostList(response.data.data);
    } catch (err) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPostDetail = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      setPostDetail(null);
      const response = await authAxios.get(`/api/posts/${postId}`);
      setPostDetail(response.data.data);
    } catch (err) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePostLike = async (postId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAxios.put(`/api/auth/posts/${postId}/like`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePostSave = async (postId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAxios.put(`/api/auth/posts/${postId}/save`);
    } catch (error) {
      setError("Failed to toggle save");
    } finally {
      setLoading(false);
    }
  };

  const saveNewPost = async (
    isPostSubmited,
    postTitle,
    postDetail,
    form = ""
  ) => {
    setLoading(true);
    setError(null);
    setPostId(null);
    try {
      const response = await authAxios.post("/api/auth/posts", {
        postTitle,
        postDetail,
      });
      if (isPostSubmited) {
        return saveNewPostImg(response.data.data.postId, form);
      } else {
        return response.data.data.postId;
      }
    } catch (error) {
      setError("Failed to save new post");
    } finally {
      setLoading(false);
    }
  };

  const saveNewPostImg = async (postId, formData) => {
    setLoading(true);
    setError(null);
    setPostId(null);
    try {
      const response = await authAxios.post(
        `/api/auth/posts/${postId}/image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return postId;
    } catch (error) {
      console.error("Failed to save postImg", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAxios.delete(`/api/auth/posts/${postId}`);
    } catch (error) {
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  const writeComment = async (postId, commentDetail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAxios.post(
        `/api/auth/posts/${postId}/comment`,
        {
          commentDetail,
        }
      );
    } catch (error) {
      setError("Failed to save new comment");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (postId, commentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAxios.delete(
        `/api/auth/posts/${postId}/${commentId}`
      );
    } catch (error) {
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommunityContext.Provider
      value={{
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
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export { CommunityContext, CommunityProvider };
