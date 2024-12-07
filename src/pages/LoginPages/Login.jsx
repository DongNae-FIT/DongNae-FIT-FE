import { useTranslation } from "react-i18next";

import styles from "@/pages/LoginPages/Login.module.css";

const Login = () => {
  const { t, i18n } = useTranslation();

  const rest_api_key = import.meta.env.VITE_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URL;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["img-section"]}>
        <img
          className={styles["login__img"]}
          src={
            i18n.language == "ko"
              ? "introduction_img.png"
              : "introduction_img_eng.png"
          }
        />
      </div>
      <div className={styles["kakao-login"]} onClick={handleLogin}>
        <img
          className={styles["kakao-login__symbol"]}
          src={"/kakao_symbol.png"}
          alt="Kakao Login"
        />
        <div className={styles["kakao-login__text"]}>{t("login.kakao")}</div>
      </div>
    </div>
  );
};

export default Login;
