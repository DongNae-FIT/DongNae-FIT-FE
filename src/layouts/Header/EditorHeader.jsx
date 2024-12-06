import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "@/layouts/Header/EditorHeader.module.css";

const EditorHeader = ({ title, onClick }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={styles["editor-header"]}>
      <img
        src={"/icon/icon_cancel_black.png"}
        className={styles["cancel-icon"]}
        onClick={() => navigate(-1)}
        alt="Back"
      />
      <div className={styles["header__title"]}>{title}</div>
      <button className={styles["done-button"]} onClick={onClick}>
        {t("buttons.done")}
      </button>
    </div>
  );
};

export default EditorHeader;
