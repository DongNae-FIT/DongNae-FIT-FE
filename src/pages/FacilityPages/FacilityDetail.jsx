import { useTranslation } from "react-i18next";

import styles from "@/pages/FacilityPages/FacilityDetail.module.css";
import KakaoMap from "@/components/KakaoMap";

const FacilityDetail = () => {
  const { t } = useTranslation();
  const isPublic = true;
  const locations = [{ lat: 37.5665, lng: 126.978, name: "서울" }];

  return (
    <div className={styles["facility-detail"]}>
      <div className={styles["map"]}>
        {" "}
        <KakaoMap locations={locations} mapHeight={300 * 1.2} />
      </div>

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
