import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [searchResultAll, setSearchResultAll] = useState([]);
  const [recommendedProgramList, setRecommendedProgramList] = useState([]);
  const [trendingPostList, setTrendingPostList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authAxios } = useContext(AuthContext);


  const getDataForHome = async () => {
    setLoading(true);
    setError(null);
    try {
      setRecommendedProgramList([]);
      setTrendingPostList([]);
      const response = await authAxios.get(`/api/main/home`);
      setRecommendedProgramList(response.data.data.programData);
      setTrendingPostList(response.data.data.postData);
    } catch (err) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const SearchAll = async (searchInput = "") => {
    setLoading(true);
    setError(null);
    try {
      setSearchResultAll([]);
      const response = await authAxios.get(`/api/main?search=${searchInput}`);
      setSearchResultAll(response.data.data);
    } catch (err) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContext.Provider
      value={{
        recommendedProgramList,
        trendingPostList,
        searchResultAll,
        getDataForHome,
        SearchAll,
        loading,
        error,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
