import { useContext } from "react";
import { FacilityContext } from "@/contexts/FacilityContext";

const useFacility = () => {
  const {
    entireFacilityList,
    facilityDetail,
    getEntireFacilityList,
    getFacilityDetail,
    loading,
    error,
  } = useContext(FacilityContext);

  return {
    entireFacilityList,
    facilityDetail,
    getEntireFacilityList,
    getFacilityDetail,
    loading,
    error,
  };
};

export default useFacility;
