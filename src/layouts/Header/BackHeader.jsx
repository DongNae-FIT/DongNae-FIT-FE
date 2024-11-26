import styles from "@/layouts/Header/BackHeader.module.css";
import { useNavigate } from "react-router-dom";

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["back-header"]}>
      <img
        src={"/icon/icon_left_black.png"}
        className={styles["back-icon"]}
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default BackHeader;
