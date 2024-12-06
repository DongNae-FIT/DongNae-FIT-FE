import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated, isOnBoard } = useAuth();

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const initialize = async () => {
      if (code) {
        try {
          await login(code);
        } catch (error) {
          console.error("Login failed", error);
        }
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && isOnBoard) {
        navigate("/login/info");
      } else if (isAuthenticated && !isOnBoard) {
        navigate("/");
      } else if (error) {
        navigate("/login");
      }
    }
  }, [loading, isAuthenticated, error, navigate]);

  if (loading) {
    return <h1>로그인 중입니다.</h1>;
  }

  return null;
};

export default KakaoRedirect;
