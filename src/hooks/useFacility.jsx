import { useContext } from "react";
import { FacilityContext } from "@/contexts/FacilityContext";

const useFacility = () => {
  const { entireFacilityList, getEntireFacilityList, loading, error } =
    useContext(FacilityContext);

  return {
    entireFacilityList,
    getEntireFacilityList,
    loading,
    error,
  };
};

export default useFacility;
