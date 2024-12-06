import { useContext } from "react";
import { MainContext } from "@/contexts/MainContext";

const useMain = () => {
  const {
    recommendedProgramList,
    trendingPostList,
    searchResultAll,
    getDataForHome,
    SearchAll,
    loading,
    error,
  } = useContext(MainContext);

  return {
    recommendedProgramList,
    trendingPostList,
    searchResultAll,
    getDataForHome,
    SearchAll,
    loading,
    error,
  };
};

export default useMain;
