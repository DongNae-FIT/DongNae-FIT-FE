import React, { createContext, useState } from "react";
import authAxios from "@/contexts/authAxios";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [entireFacilityList, setEntireFacilityList] = useState([]);
  const [facilityDetail, setFacilityDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEntireFacilityList = async (type, searchInput = "") => {
    setLoading(true);
    setError(null);
    try {
      setEntireFacilityList([]);
      const response = await authAxios.get(
        `/api/facilities?type=${type}&search=${searchInput}`
      );
      setEntireFacilityList(response.data.data);
    } catch (err) {
      setError(err || "Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const getFacilityDetail = async (facilityId) => {
    setLoading(true);
    setError(null);

    try {
      setFacilityDetail(null);
      await getEntireFacilityList();
      if (entireFacilityList.length > 0) {
        console.log("전체", entireFacilityList);
        const facility = entireFacilityList.find(
          (item) => item.facilityId === facilityId
        );
        console.log("facility", facility);
        if (!facility) {
          throw new Error("해당 시설을 찾을 수 없습니다.");
        }
        setFacilityDetail(facility);
      }
    } catch (err) {
      setError(err.message || "Failed to load facility details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FacilityContext.Provider
      value={{
        entireFacilityList,
        facilityDetail,
        getEntireFacilityList,
        getFacilityDetail,
        loading,
        error,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};

export { FacilityContext, FacilityProvider };
