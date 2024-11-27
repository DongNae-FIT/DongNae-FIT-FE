import styles from "@/pages/LoginPages/AdditionalInfo.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AdditionalInfo = () => {
  const { t, i18n } = useTranslation();
  const [nickname, setNickname] = useState();
  const [age, setAge] = useState();
  const [location, setLocation] = useState();

  return (
    <div className={styles["additional-info"]}>
      <div className={styles["page-title"]}>{t("additional_info.title")}</div>
      <div className={styles["page-content"]}>
        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("additional_info.nickname")}
          </div>
          <input
            type="text"
            className={styles["info__input"]}
            placeholder={t("additional_info.nickname_placeholder")}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("additional_info.age")}
          </div>
          <input
            type="number"
            className={styles["info__input"]}
            placeholder={t("additional_info.age_placeholder")}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("additional_info.location")}
          </div>
          <input
            type="text"
            className={styles["info__input"]}
            placeholder={t("additional_info.location_placeholder")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <button className={styles["done-button"]}>{t("buttons.done")}</button>
    </div>
  );
};

export default AdditionalInfo;
