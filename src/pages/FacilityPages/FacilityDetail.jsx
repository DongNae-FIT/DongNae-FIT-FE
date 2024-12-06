import { useTranslation } from "react-i18next";

import styles from "@/pages/FacilityPages/FacilityDetail.module.css";
import KakaoMap from "@/components/KakaoMap";
import useFacility from "@/hooks/useFacility";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const FacilityDetail = () => {
  const { t } = useTranslation();
  const facilityId = useParams();
  const isPublic = true;
  const { locations, setLocation } = [];
  const { getFacilityDetail, facilityDetail } = useFacility();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getFacilityDetail(facilityId);
        setLocation({
          name: facilityDetail.facilityAddr,
          lat: facilityDetail.facilityLatitude,
          lng: facilityDetail.facilityLongitude,
        });
      } catch (err) {
        console.error("Failed to fetch use Info:", err);
      }
    };
    initialize();
  }, []);

  return (
    <div className={styles["facility-detail"]}>
      <KakaoMap locations={locations} mapHeight={300 * 1.5} />

      <div className={styles["contents"]}>
        <div className={styles["info-wrapper"]}>
          <div className={styles["button-wrapper"]}>
            <div className={styles["text-wrapper"]}>
              <div className={styles["name"]}>
                {facilityDetail.facilityName}
              </div>
              <div className={styles["type"]}>
                {facilityDetail.facilityType}
              </div>
            </div>
            <button
              className={styles["find-path-button"]}
              onClick={() => {
                window.open(
                  `https://map.kakao.com/link/to/${locations.name},${locations.lat},${locations.lng}`
                );
              }}
            >
              {t("buttons.find_path")}
            </button>
          </div>
          <div className={styles["text-wrapper"]}>
            <div className={styles["distance"]}> {facilityDetail.km}</div>
            {isPublic ? (
              <div className={styles["public"]}>• {t("facility.public")}</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;
