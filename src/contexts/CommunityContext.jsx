import React, { createContext, useState } from "react";
import axios from "axios";

const CommunityContext = createContext();

const CommunityProvider = ({ children }) => {
  const [recommendedPostList, setRecommendedPostList] = useState([]);
  const [entirePostList, setEntirePostList] = useState([]);
  const [postDetail, setPostDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCommunityDetail = (communityId, updatedData) => {
    setPostDetail((prev) =>
      prev.map((p) =>
        p.communityId === communityId ? { ...p, ...updatedData } : p
      )
    );
  };

  const getRecommendedPostList = async () => {
    setLoading(true);
    setError(null);
    try {
      setRecommendedPostList([]);
      const response = await axios.get("/api/post/recommend");
      setRecommendedPostList(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended community");
    } finally {
      setLoading(false);
    }
  };

  const getEntirePostList = async () => {
    setLoading(true);
    setError(null);
    try {
      setEntirePostList([]);
      const response = await axios.get("/api/posts");
      setEntirePostList(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended community");
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
      const updatedData = { isLike: response.data.isLike };
      updateCommunityDetail(postId, updatedData);
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
      const updatedData = { isSave: response.data.isSave };
      updateCommunityDetail(postId, updatedData);
    } catch (error) {
      setError("Failed to toggle save");
    } finally {
      setLoading(false);
    }
  };

  const saveNewPost = async (newPost) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("api/posts", {
        post: newPost,
      });
    } catch (error) {
      setError("Failed to save new post");
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (postId, updatedPost) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`api/posts/${postId}`, {
        post: updatedPost,
      });
    } catch (error) {
      setError("Failed to save updated post");
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

  const writeComment = async (postId, newComment) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`api/posts/${postId}/comment`, {
        comment: newComment,
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
        recommendedPostList,
        entirePostList,
        postDetail,
        getRecommendedPostList,
        getEntirePostList,
        getPostDetail,
        togglePostLike,
        togglePostSave,
        saveNewPost,
        editPost,
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
