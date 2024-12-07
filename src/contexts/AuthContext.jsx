import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [isOnBoard, setIsOnBoard] = useState(null);
  const [coordinate, setCoordinate] = useState(null);

  const [isDuplicate, setIsDuplicate] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true); // 초기화 시작
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
        setLoading(false); // 초기화 완료
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
      })
      .catch((error) => {
        console.error("Failed to login:", error);
        setError(error.message);
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
          setIsDuplicate(false);
        }
        if (response.message == "중복됩니다. 다른 닉네임으로 수정해주세요.") {
          setIsDuplicate(true);
        }
      })
      .catch((error) => {
        console.error("닉네임 중복 체크 중 오류 발생:", error);
        setError(error.message);
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);

    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsAuthenticated(false);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // authAxios 생성 및 인터셉터 설정
  const authAxios = axios.create({ withCredentials: true });

  authAxios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await axios.post(
              `/member/refresh?refreshToken=${refreshToken}`
            );
            const newAccessToken = response.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return authAxios(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            logout();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  const setLocationInfo = async (region) => {
    setLoading(true);
    setCoordinate(null);
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

      setCoordinate(locationInfo);
      return locationInfo;
    } catch (error) {
      console.error("Failed to onboard:", error);
      setError(error.message);
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
        coordinate,
        login,
        checkNicknameDuplicate,
        onBoard,
        logout,
        setLocationInfo,
        loading,
        error,
        authAxios,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
