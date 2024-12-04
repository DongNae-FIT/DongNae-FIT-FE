import axios from "axios";

const authAxios = axios.create({ withCredentials: true });

// 요청 인터셉터를 추가하여 accessToken을 Authorization 헤더에 포함시킵니다.
authAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터에서 토큰 갱신 로직 처리
authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // AccessToken이 만료되었을 때만 처리
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

          // 기존 요청에 새로운 AccessToken 설정 후 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return authAxios(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // 필요 시 추가 처리 (예: 로그아웃)
        }
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
