import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/MyPages/User/SetLocation.module.css";

const SetLocation = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState("기존 위치");

  return (
    <div className={styles["set-location"]}>
      <div className={styles["input-row"]}>
        <img
          src={"/icon/icon_location_black.png"}
          alt="위치 아이콘"
          className={styles["location-icon"]}
        />
        <input
          type="text"
          className={styles["input"]}
          placeholder={t(
            "additional_info.location_placeholder",
            "위치를 입력하세요"
          )}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className={styles["map"]}>지도</div>
    </div>
  );
};

export default SetLocation;
