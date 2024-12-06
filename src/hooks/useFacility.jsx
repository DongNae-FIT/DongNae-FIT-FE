import { useContext } from "react";
import { FacilityContext } from "@/contexts/FacilityContext";

const useFacility = () => {
  const {
    entireFacilityList,
    facilityDetail,
    getEntiretFacilityList,
    getFacilityDetail,
    loading,
    error,
  } = useContext(FacilityContext);

  return {
    entireFacilityList,
    facilityDetail,
    getEntiretFacilityList,
    getFacilityDetail,
    loading,
    error,
  };
};

export default useFacility;
