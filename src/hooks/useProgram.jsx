import { useContext } from "react";
import { ProgramContext } from "@/contexts/ProgramContext";

const useProgram = () => {
  const {
    entireProgramList,
    programDetail,
    getEntireProgramList,
    getProgramDetail,
    toggleProgramLike,
    saveNewReview,
    loading,
    error,
  } = useContext(ProgramContext);

  return {
    entireProgramList,
    programDetail,
    getEntireProgramList,
    getProgramDetail,
    toggleProgramLike,
    saveNewReview,
    loading,
    error,
  };
};

export default useProgram;
