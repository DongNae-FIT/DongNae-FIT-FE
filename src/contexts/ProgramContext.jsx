import React, { createContext, useState } from "react";
import axios from "axios";
import authAxios from "@/contexts/authAxios";

const ProgramContext = createContext();

const ProgramProvider = ({ children }) => {
  const [entireProgramList, setEntireProgramList] = useState([]);
  const [programDetail, setProgramDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEntireProgramList = async (
    min = 0,
    max = 99999999999,
    searchInput = ""
  ) => {
    setLoading(true);
    setError(null);
    try {
      setEntireProgramList([]);
      const response = await authAxios.get(
        `/api//programs?min=${min}&max=${max}&search=${searchInput}`
      );
      setEntireProgramList(response.data.data);
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
      const response = await authAxios.get(`/api/programs/${programId}`);
      setProgramDetail(response.data.data);
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
      const response = await authAxios.put(
        `/api/auth/programs/${programId}/save`
      );
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
      const response = await authAxios.post(`/programs/${programId}/review`, {
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
        programDetail,
        getEntireProgramList,
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
