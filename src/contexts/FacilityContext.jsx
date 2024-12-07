import React, { createContext, useState } from "react";
import authAxios from "@/contexts/authAxios";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [entireFacilityList, setEntireFacilityList] = useState([]);

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

  return (
    <FacilityContext.Provider
      value={{
        entireFacilityList,
        getEntireFacilityList,
        loading,
        error,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};

export { FacilityContext, FacilityProvider };
