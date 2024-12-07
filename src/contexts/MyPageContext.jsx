import React, { createContext, useState } from "react";
import axios from "axios";
import authAxios from "@/contexts/authAxios";
import useAuth from "@/hooks/useAuth";

const initialUserState = {
  name: "",
  region: "",
  profile: "",
};

const MyPageContext = createContext();

const MyPageProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { setLocationInfo } = useAuth();
  const [authInfo, setAuthInfo] = useState([]);

  const getUserInfo = () => {
    setLoading(true);
    return authAxios
      .get("/api/auth/mypage")
      .then((response) => {
        const { name, region, profile } = response.data.data;
        setUser({ name, region, profile });
      })
      .catch((error) => {
        console.error("Failed to get User Info:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeNickname = async (name) => {
    setLoading(true);

    try {
      const response = await authAxios.put(`/api/auth/mypage/name`, {
        name,
      });
    } catch (error) {
      console.error("Failed to change nickname:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const changeRegion = async (region) => {
    setLoading(true);

    try {
      const locationInfo = await setLocationInfo(region);

      const { province, district, latitude, longitude } = locationInfo;

      const response = await authAxios.put(`/api/auth/mypage/region`, {
        region,
        province,
        district,
        latitude,
        longitude,
      });
    } catch (error) {
      console.error("Failed to change region :", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getProgramSaved = () => {
    setLoading(true);
    return authAxios
      .get("/api/auth/mypage/programs/save")
      .then((response) => {
        setAuthInfo(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to get User Info:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MyPageContext.Provider
      value={{
        user,
        authInfo,
        getUserInfo,
        changeNickname,
        changeRegion,
        getProgramSaved,
        loading,
        error,
      }}
    >
      {children}
    </MyPageContext.Provider>
  );
};

export { MyPageContext, MyPageProvider };
