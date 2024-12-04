import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import authAxios from "@/contexts/authAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = (code) => {
    setLoading(true);
    return authAxios
      .get(`/api/member/kakao?code=${code}`)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Failed to login:", error);
        window.alert("로그인 실패");
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onBoard = async (name, region) => {
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

      const { y: Latitude, x: Longitude } = geocodeResponse.data.documents[0];

      // 3. 온보딩 요청
      const response = await authAxios.post(`/api//member/onboard`, {
        name,
        region,
        province,
        district,
        Latitude,
        Longitude,
      });
    } catch (error) {
      console.error("Failed to onboard:", error);

      // 오류 시 알림 및 홈으로 이동
      if (
        window.confirm(
          "[Error] 알 수 없는 오류가 발생하였습니다. 홈 화면으로 이동합니다."
        )
      ) {
        navigate("/");
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    return authAxios
      .post("주소", {})
      .then(() => {
        localStorage.removeItem("token");
        setUser();
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
