import React, { createContext, useState } from "react";
import axios from "axios";
import authAxios from "@/contexts/authAxios";

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

  const getUserInfo = () => {
    setLoading(true);
    return authAxios
      .get("/api/auth/mypage")
      .then((response) => {
        const { name, region, profile } = response.data;
        setUser({ name, region, profile });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Failed to get User Info:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeRegion = async (region) => {
    setLoading(true);

    // 1. region에서 province와 district 추출
    const [province, district, ...rest] = region.split(" ");

    try {
      // 2. 카카오맵 Geocoding API 호출하여 Latitude와 Longitude 가져오기
      const rest_api_key = import.meta.env.VITE_REST_API_KEY;
      const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        region
      )}`;

      const geocodeResponse = await axios.get(url, {
        headers: { Authorization: `KakaoAK ${rest_api_key}` },
      });

      if (geocodeResponse.data.documents.length === 0) {
        throw new Error("유효한 주소를 찾을 수 없습니다.");
      }

      const { y: latitude, x: longitude } = geocodeResponse.data.documents[0];

      // 3. 온보딩 요청
      const response = await authAxios.put(`api/auth/mypage/region`, {
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

  return (
    <MyPageContext.Provider
      value={{
        user,
        getUserInfo,
        loading,
        error,
      }}
    >
      {children}
    </MyPageContext.Provider>
  );
};

export { MyPageContext, MyPageProvider };
