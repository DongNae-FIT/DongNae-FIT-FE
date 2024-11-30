import styles from "@/pages/MyPages/SetLocation.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SetLocation = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState("기존 위치");
  const navigate = useNavigate();

  return (
    <div className={styles["set-location"]}>
      <div className={styles["input-row"]}>
        <img
          src={"/icon/icon_location_black.png"}
          className={styles["location-icon"]}
        />
        <input
          type="text"
          className={styles["input"]}
          placeholder={t("additional_info.location_placeholder")}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className={styles["map"]}>지도</div>
    </div>
  );
};

export default SetLocation;
