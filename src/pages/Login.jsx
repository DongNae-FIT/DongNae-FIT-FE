import styles from "@/pages/Login.module.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language;

  const kakaoLoginImgSrc =
    currentLang === "ko" ? "/kakao_login_kr.png" : "/kakao_login_eng.png";

  const Rest_API_Key = "c4466ede44fd01c7de0788a9d99cf576";
  const redirect_uri = "http://localhost:5173/auth";

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_API_Key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
    const code = new URL(document.location.toString()).searchParams.get("code"); // 이상한코드가한가득
    console.log(code);
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["login__title"]}>{t("login.title")}</div>
      <div className={styles["login__img"]}></div>

      <img
        className={styles["login__kakao"]}
        src={kakaoLoginImgSrc}
        alt="Kakao Login"
        onClick={handleLogin}
      />
    </div>
  );
};

export default Login;
