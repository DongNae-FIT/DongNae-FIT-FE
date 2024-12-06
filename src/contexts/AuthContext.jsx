import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import authAxios from "@/contexts/authAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnBoard, setIsOnBoard] = useState(null);

  const [isDuplicate, setIsDuplicate] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      if (accessToken) {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      // AccessToken이 없고 RefreshToken이 있을 경우 토큰 갱신 시도
      try {
        const response = await axios.post(
          `/member/refresh?refreshToken=${refreshToken}`
        );
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token refresh failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (code) => {
    setLoading(true);
    return authAxios
      .get(`/api/member/kakao?code=${code}`)
      .then((response) => {
        const accessToken = response.data.token.accessToken;
        const refreshToken = response.data.token.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
        setIsOnBoard(response.data.onboard);

        console.log("로그인:", response.data);
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

  const checkNicknameDuplicate = async (nickname) => {
    setLoading(true);
    return authAxios
      .get(`/api/auth/member/check?name=${nickname}`)
      .then((response) => {
        if (response.status == 200) {
          console.log("중복 닉네임 없음");
          setIsDuplicate(false);
        }
        if (response.message == "중복됩니다. 다른 닉네임으로 수정해주세요.") {
          console.log("이미 사용중인 닉네임");
          setIsDuplicate(true);
        }
      })
      .catch((error) => {
        console.error("닉네임 중복 체크 중 오류 발생:", error);
        setError(error);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onBoard = async (name, region) => {
    setLoading(true);

    try {
      const locationInfo = await setLocationInfo(region);
      const { province, district, latitude, longitude } = locationInfo;

      console.log(name, region, province, district, latitude, longitude);
      const response = await authAxios.post(`/api/auth/member/onboard`, {
        name,
        region,
        province,
        district,
        latitude,
        longitude,
      });

      setIsAuthenticated(true);
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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

  const setLocationInfo = async (region) => {
    setLoading(true);

    try {
      // 1. region에서 province와 district 추출
      const [province, district, ...rest] = region.split(" ");

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

      const locationInfo = {
        region,
        province,
        district,
        latitude,
        longitude,
      };

      return locationInfo;
    } catch (error) {
      console.error("Failed to onboard:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isOnBoard,
        isDuplicate,
        login,
        checkNicknameDuplicate,
        onBoard,
        logout,
        setLocationInfo,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
