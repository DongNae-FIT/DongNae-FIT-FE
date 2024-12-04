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
      const response = await axios.get("/api/community/recommend");
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
      const response = await axios.get("/api/communities");
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
      const response = await axios.get(`/api/communities/${postId}`);
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
      const response = await axios.put("/api/community/like/toggle", {
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

  const saveNewReview = async (postId, newPost, boolean) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `/communities/${postId}?save=${boolean}`,
        {
          post: newPost,
        }
      );
    } catch (error) {
      setError("Failed to save new review");
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
        saveNewReview,
        loading,
        error,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export { CommunityContext, CommunityProvider };
