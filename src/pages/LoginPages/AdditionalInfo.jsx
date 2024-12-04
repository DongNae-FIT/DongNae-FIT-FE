import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/LoginPages/AdditionalInfo.module.css";
import LocationInput from "@/components/LocationInput";

const AdditionalInfo = () => {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState(""); // 초기값을 빈 문자열로 설정
  const [location, setLocation] = useState(""); // 초기값을 빈 문자열로 설정
  const [openPostcode, setOpenPostcode] = useState(false);

  const handle = {
    // 주소 찾기 버튼 클릭
    clickButton: () => {
      setOpenPostcode(true);
    },
    // 팝업 닫기
    closePopup: () => {
      setOpenPostcode(false);
    },
  };

  const handleAddressSelect = (address) => {
    setLocation(address);
    setOpenPostcode(false);
  };

  return (
    <div className={styles["additional-info"]}>
      <div className={styles["page-title"]}>{t("additional_info.title")}</div>
      <div className={styles["page-content"]}>
        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("additional_info.nickname")}
          </div>
          <div className={styles["nickname_section"]}>
            <input
              type="text"
              className={styles["info__input"]}
              placeholder={t("additional_info.nickname_placeholder")}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button className={styles["input-button"]}>
              {t("buttons.duplication_check")}
            </button>
          </div>
        </div>

        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("additional_info.location")}
          </div>
          <div className={styles["nickname_section"]}>
            <input
              type="text"
              className={styles["info__input"]}
              placeholder={t("additional_info.location_placeholder")}
              value={location}
              readOnly
            />
            <button
              className={styles["input-button"]}
              onClick={handle.clickButton}
            >
              {t("buttons.find_address")}
            </button>
          </div>
        </div>
      </div>

      <button className={styles["done-button"]}>{t("buttons.done")}</button>

      {openPostcode && (
        <div className={styles["popup-overlay"]}>
          <LocationInput onSelectAddress={handleAddressSelect} />
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;
