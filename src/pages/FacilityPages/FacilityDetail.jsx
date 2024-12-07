import { useTranslation } from "react-i18next";

import styles from "@/pages/FacilityPages/FacilityDetail.module.css";
import KakaoMap from "@/components/KakaoMap";
import useFacility from "@/hooks/useFacility";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@/utils/Loading";

const FacilityDetail = () => {
  const { t } = useTranslation();
  const { facilityId } = useParams();
  const isPublic = true;
  const [locations, setLocations] = useState(null);
  const { getEntireFacilityList, entireFacilityList, loading, error } =
    useFacility();
  const [facilityDetail, setFacilityDetail] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getEntireFacilityList();

        if (entireFacilityList.length > 0 && facilityId) {
          const facility = entireFacilityList.find(
            (item) => item.facilityId == facilityId
          );
          setFacilityDetail(facility);

          if (facility) {
            const coordinate = {
              lat: facility.facilityLatitude,
              lng: facility.facilityLongitude,
              name: facility.facilityName,
            };
            setLocations([coordinate]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch use Info:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !facilityDetail || !locations) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                  `https://map.kakao.com/link/to/${facilityDetail.facilityName},${facilityDetail.facilityLatitude},${facilityDetail.facilityLongitude}`
                );
              }}
            >
              {t("buttons.find_path")}
            </button>
          </div>
          <div className={styles["text-wrapper"]}>
            <div className={styles["distance"]}> {facilityDetail.km} km</div>
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
