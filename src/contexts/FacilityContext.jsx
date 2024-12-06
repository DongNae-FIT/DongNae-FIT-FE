import React, { createContext, useState } from "react";
import axios from "axios";
import authAxios from "@/contexts/authAxios";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [entireFacilityList, setEntireFacilityList] = useState([]);
  const [facilityDetail, setFacilityDetail] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEntiretFacilityList = async (type, searchInput = "") => {
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
      const facility = entireFacilityList.find(
        (item) => item.facilityId === facilityId
      );

      if (!facility) {
        throw new Error("해당 시설을 찾을 수 없습니다.");
      }
      setFacilityDetail(facility);
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
        getEntiretFacilityList,
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
