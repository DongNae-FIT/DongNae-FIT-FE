import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [entireFacilityList, setEntireFacilityList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authAxios } = useContext(AuthContext);

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
      setError(error.message);
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
