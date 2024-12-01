import { useContext } from "react";
import { ClassContext } from "@/contexts/ClassContext";

const useClass = () => {
  const {
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
  } = useContext(ClassContext);

  return {
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
  };
};

export default useClass;
