import { useNavigate } from "react-router-dom";
import styles from "@/layouts/Header/BackHeader.module.css";

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["back-header"]}>
      <img
        src={"/icon/icon_left_black.png"}
        className={styles["back-arrow-icon"]}
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default BackHeader;
