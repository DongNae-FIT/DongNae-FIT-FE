import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/components/Facility/FacilityItem.module.css";

const FacilityItem = ({ name, type, distance, isPublic = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      className={styles["facility-item"]}
      onClick={() => {
        navigate("/facility/detail");
      }}
    >
      <img src={"/example.jpg"} className={styles["main-img"]} />
      <div className={styles["info-wrapper"]}>
        <div className={styles["text-wrapper"]}>
          <div className={styles["name"]}>{name}</div>
          <div className={styles["type"]}>{type}</div>
        </div>
        <div className={styles["text-wrapper"]}>
          <div className={styles["distance"]}>{distance}</div>
          {isPublic ? (
            <div className={styles["public"]}>• {t("facility.filter1")}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityItem;