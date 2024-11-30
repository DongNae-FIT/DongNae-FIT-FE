import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/CommunityPages/CommunityMain.module.css";

const CommunityMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles["community-main"]}>
      <div className={styles["post-list"]}>
        <div
          className={styles["post-item"]}
          onClick={() => {
            navigate("/community/post");
          }}
        >
          게시글
        </div>
      </div>
      <button
        className={styles["write-button"]}
        onClick={() => {
          navigate("/community/post/new");
        }}
      >
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write-icon"]}
        />
        {t("community.write")}
      </button>
    </div>
  );
};

export default CommunityMain;
