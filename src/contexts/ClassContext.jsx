import React, { createContext, useState } from "react";
import axios from "axios";

const ClassContext = createContext();

const ClassProvider = ({ children }) => {
  const [recommendedClassList, setRecommendedClassList] = useState([]);
  const [entireClassList, setEntireClassList] = useState([]);
  const [filteredClassList, setFilteredClassList] = useState([]);
  const [classDetail, setClassDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateClassDetail = () => {};

  const getRecommendedClassList = async () => {
    setLoading(true);
    setError(null);
    try {
      setRecommendedClassList([]);
      const response = await axios.get("/api/class/recommend");
      setRecommendedClassList(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended class");
    } finally {
      setLoading(false);
    }
  };

  const getEntireClassList = async () => {
    setLoading(true);
    setError(null);
    try {
      setEntireClassList([]);
      const response = await axios.get("/api/class");
      setEntireClassList(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended class");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredClassList = async (align, priceMin, priceMax, filter) => {
    setLoading(true);
    setError(null);
    try {
      setFilteredClassList([]);

      const params = {};
      if (align) params.align = align;
      if (priceMin) params.priceMin = priceMin;
      if (priceMax) params.priceMax = priceMax;
      if (filter && filter.length > 0) params.filter = filter.join(",");

      const response = await axios.get("/api/class/filter", { params });

      setFilteredClassList(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended class");
    } finally {
      setLoading(false);
    }
  };

  const getClassDetail = async (classId) => {
    setLoading(true);
    setError(null);
    try {
      setClassDetail(null);
      const response = await axios.get(`/api/class/${classId}`);
      setClassDetail(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended class");
    } finally {
      setLoading(false);
    }
  };

  const toggleClassLike = async (classId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/class/like/toggle", {
        classId,
      });
      updateClassDetail();
    } catch (error) {
      setError("Failed to toggle like");
    } finally {
      setLoading(false);
    }
  };

  const saveNewReview = async (classId, newReview) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/class/like/toggle", {
        classId,
        newReview,
      });
    } catch (error) {
      setError("Failed to save new review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClassContext.Provider
      value={{
        recommendedClassList,
        entireClassList,
        filteredClassList,
        classDetail,
        getRecommendedClassList,
        getEntireClassList,
        getFilteredClassList,
        getClassDetail,
        toggleClassLike,
        saveNewReview,
        loading,
        error,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export { ClassContext, ClassProvider };
