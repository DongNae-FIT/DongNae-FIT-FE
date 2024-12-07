import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "@/utils/Loading";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOnBoard == null) return;
    console.log("리다이렉트:", isOnBoard);
    if (isOnBoard) {
      navigate("/login/info", { state: { isLogin: true } });
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnBoard]);

  if (loading || isOnBoard == null) {
    return <Loading />;
  }

  return null;
};

export default KakaoRedirect;
