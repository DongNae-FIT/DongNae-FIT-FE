import { useContext } from "react";
import { ProgramContext } from "@/contexts/ProgramContext";

const useProgram = () => {
  const {
    recommendedProgramList,
    entireProgramList,
    filteredProgramList,
    programDetail,
    getRecommendedProgramList,
    getEntireProgramList,
    getFilteredProgramList,
    getProgramDetail,
    toggleProgramLike,
    saveNewReview,
    loading,
    error,
  } = useContext(ProgramContext);

  return {
    recommendedProgramList,
    entireProgramList,
    filteredProgramList,
    programDetail,
    getRecommendedProgramList,
    getEntireProgramList,
    getFilteredProgramList,
    getProgramDetail,
    toggleProgramLike,
    saveNewReview,
    loading,
    error,
  };
};

export default useProgram;
