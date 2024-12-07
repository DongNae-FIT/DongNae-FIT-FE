import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      window.alert(t("warning.need_login"));
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate, location.pathname]);

  if (isLoading) {
    return null;
  }

  return element;
};

export default ProtectedRoute;
