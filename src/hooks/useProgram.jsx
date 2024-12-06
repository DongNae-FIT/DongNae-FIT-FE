import { useContext } from "react";
import { ProgramContext } from "@/contexts/ProgramContext";

const useProgram = () => {
  const {
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
  } = useContext(ProgramContext);

  return {
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
  };
};

export default useProgram;
