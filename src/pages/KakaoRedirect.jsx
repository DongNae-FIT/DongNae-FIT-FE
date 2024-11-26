import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth"; // 사용자 인증 훅 임포트

export function KakaoRedirect() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth(); // 로그인 함수 가져오기

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    const initialize = async () => {
      try {
        await login(code);
      } catch (error) {
        console.error("Login failed", error); // 콘솔에 오류 로그
      }
    };
    initialize();
  }, [code, login]);

  if (loading) {
    return <h1>로그인 중입니다.</h1>; // 로딩 중 표시
  }

  if (error) {
    return <div>Error loading history: {error.message}</div>; // 에러 발생 시 메시지 표시
  }

  return navigate("/");
}
export default KakaoRedirect;
