import styles from "@/pages/CommunityPages/CommunityMain.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CommunityMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles["community-main"]}>
      <div className={styles["community__content"]}>
        <div
          className={styles["community__post"]}
          onClick={() => {
            navigate("/community/post");
          }}
        >
          게시글
        </div>
      </div>
      <button
        className={styles["write__button"]}
        onClick={() => {
          navigate("/community/post/new");
        }}
      >
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write__icon"]}
        />
        {t("community.write")}
      </button>
    </div>
  );
};

export default CommunityMain;
