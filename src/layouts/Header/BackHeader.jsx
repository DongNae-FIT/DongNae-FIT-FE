import { useNavigate, useLocation } from "react-router-dom";
import styles from "@/layouts/Header/BackHeader.module.css";

const BackHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // 이전 경로가 로그인 리다이렉트로 인해 보호된 페이지라면 홈으로 이동
    if (location.state?.from) {
      navigate("/"); // 안전한 기본 경로 (홈)
    } else {
      navigate(-1); // 일반적인 뒤로가기
    }
  };

  return (
    <div className={styles["back-header"]}>
      <img
        src={"/icon/icon_left_black.png"}
        className={styles["back-arrow-icon"]}
        onClick={handleBack}
      />
    </div>
  );
};

export default BackHeader;
