import { useTranslation } from "react-i18next";

import styles from "@/pages/FacilityPages/FacilityDetail.module.css";

const FacilityDetail = () => {
  const { t } = useTranslation();
  const isPublic = true;

  return (
    <div className={styles["facility-detail"]}>
      <div className={styles["map"]}>지도</div>

      <div className={styles["contents"]}>
        <div className={styles["info-wrapper"]}>
          <div className={styles["button-wrapper"]}>
            <div className={styles["text-wrapper"]}>
              <div className={styles["name"]}>이름</div>
              <div className={styles["type"]}>종류</div>
            </div>
            <button className={styles["find-path-button"]}>
              {t("buttons.find_path")}
            </button>
          </div>
          <div className={styles["text-wrapper"]}>
            <div className={styles["distance"]}>거리</div>
            {isPublic ? (
              <div className={styles["public"]}>• {t("facility.filter1")}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles["img-wrapper"]}>
          <img src={"/example.jpg"} className={styles["facility-img"]} />
          <img src={"/example.jpg"} className={styles["facility-img"]} />
          <img src={"/example.jpg"} className={styles["facility-img"]} />
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;
