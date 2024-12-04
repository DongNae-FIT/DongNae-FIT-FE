import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/MyPages/User/SetLocation.module.css";
import LocationInput from "@/components/LocationInput";
import KakaoMap from "@/components/KakaoMap";

const SetLocation = () => {
  const { t } = useTranslation();
  const locations = [{ lat: 37.5665, lng: 126.978, name: "서울" }];
  const [location, setLocation] = useState("기존위치");
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
    <div className={styles["set-location"]}>
      {openPostcode && (
        <div className={styles["popup-overlay"]}>
          <LocationInput onSelectAddress={handleAddressSelect} />
        </div>
      )}
      <div className={styles["input-row"]}>
        <input
          type="text"
          className={styles["info__input"]}
          placeholder={t("additional_info.location_placeholder")}
          value={location}
          readOnly
        />
        <button className={styles["input-button"]} onClick={handle.clickButton}>
          {t("buttons.find_address")}
        </button>
      </div>
      <div className={styles["map"]}>
        <KakaoMap locations={locations} mapHeight={300 * 1.5} />
      </div>
    </div>
  );
};

export default SetLocation;
