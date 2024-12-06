import React, { createContext, useState } from "react";
import axios from "axios";

const ProgramContext = createContext();

const ProgramProvider = ({ children }) => {
  const [entireProgramList, setEntireProgramList] = useState([]);
  const [filteredProgramList, setFilteredProgramList] = useState([]);
  const [programDetail, setProgramDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProgramDetail = (programId, updatedData) => {
    setProgramDetail((prev) =>
      prev.map((p) =>
        p.programId === programId ? { ...p, ...updatedData } : p
      )
    );
  };

  const getEntireProgramList = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    try {
      setEntireProgramList([]);
      const response = await axios.get(
        `/api/programs?latitude=${latitude}&longitude=${longitude}`
      );
      setEntireProgramList(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended program");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredProgramList = async (align, priceMin, priceMax, filter) => {
    setLoading(true);
    setError(null);
    try {
      setFilteredProgramList([]);

      const params = {};
      if (align) params.align = align;
      if (priceMin) params.priceMin = priceMin;
      if (priceMax) params.priceMax = priceMax;
      if (filter && filter.length > 0) params.filter = filter.join(",");

      const response = await axios.get("/api/programs/filter", { params });

      setFilteredProgramList(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended program");
    } finally {
      setLoading(false);
    }
  };

  const getProgramDetail = async (programId) => {
    setLoading(true);
    setError(null);
    try {
      setProgramDetail(null);
      const response = await axios.get(`/api/programs/${programId}`);
      setProgramDetail(response.data);
    } catch (err) {
      setError(err || "Failed to load recommended program");
    } finally {
      setLoading(false);
    }
  };

  const toggleProgramLike = async (programId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put("/api/program/like/toggle", {
        programId,
      });
      const updatedData = { isLike: response.data.isLike };
      updateProgramDetail(programId, updatedData);
    } catch (error) {
      setError("Failed to toggle like");
    } finally {
      setLoading(false);
    }
  };

  const saveNewReview = async (programId, newReview) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/programs/${programId}/review`, {
        review: newReview,
      });
    } catch (error) {
      setError("Failed to save new review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProgramContext.Provider
      value={{
        entireProgramList,
        filteredProgramList,
        programDetail,
        getEntireProgramList,
        getFilteredProgramList,
        getProgramDetail,
        toggleProgramLike,
        saveNewReview,
        loading,
        error,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

export { ProgramContext, ProgramProvider };
