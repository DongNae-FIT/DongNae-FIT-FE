import React, { createContext, useState } from "react";
import axios from "axios";

const CommunityContext = createContext();

const CommunityProvider = ({ children }) => {
  const [entirePostList, setEntirePostList] = useState([]);
  const [postDetail, setPostDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEntirePostList = async (searchInput = "") => {
    setLoading(true);
    setError(null);
    try {
      setEntirePostList([]);
      const response = await axios.get(`/api/posts?search=${searchInput}`);
      setEntirePostList(response.data);
    } catch (err) {
      setError(err || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const getPostDetail = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      setPostDetail(null);
      const response = await axios.get(`/api/posts/${postId}`);
      setPostDetail(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended community");
    } finally {
      setLoading(false);
    }
  };

  const togglePostLike = async (postId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/${postId}/like`, {
        postId,
      });
    } catch (error) {
      setError("Failed to toggle like");
    } finally {
      setLoading(false);
    }
  };

  const togglePostSave = async (postId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/${postId}/save`, {
        postId,
      });
    } catch (error) {
      setError("Failed to toggle save");
    } finally {
      setLoading(false);
    }
  };

  const saveNewPost = async (postTitle, postDetail, postImage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("api/posts", {
        postTitle,
        postDetail,
        postImage,
      });
    } catch (error) {
      setError("Failed to save new post");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`api/posts/${postId}`);
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
      const response = await axios.post(`api/posts/${postId}/comment`, {
        commentDetail,
      });
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
      const response = await axios.delete(`api/posts/${postId}/${commentId}`);
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
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export { CommunityContext, CommunityProvider };