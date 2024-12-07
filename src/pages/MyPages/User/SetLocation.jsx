import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/MyPages/User/SetLocation.module.css";
import LocationInput from "@/components/LocationInput";
import KakaoMap from "@/components/KakaoMap";
import EditorHeader from "@/layouts/Header/EditorHeader";
import useMyPage from "@/hooks/useMyPage";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Loading from "@/utils/Loading";

const SetLocation = () => {
  const { t } = useTranslation();
  const locations = [{ lat: 37.5665, lng: 126.978, name: "서울" }];
  const [location, setLocation] = useState("기존위치");
  const [openPostcode, setOpenPostcode] = useState(false);
  const { setLocationInfo } = useAuth();
  const { user, getUserInfo, changeRegion, loading, error } = useMyPage();
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getUserInfo();
      } catch (err) {
        console.error("Failed to fetch use Info:", err);
      }
    };
    initialize(); // 초기화 함수 실행
    setLocation(user.region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDoneClick = async () => {
    try {
      await changeRegion(location);
      navigate(`/mypage`);
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleAddressSelect = async (address) => {
    setLocation(address);
    setOpenPostcode(false);
    const response = await setLocationInfo(address);
  };

  if (loading || !user) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <EditorHeader title={t("mypage.set_location")} onClick={onDoneClick} />

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
          <button
            className={styles["input-button"]}
            onClick={handle.clickButton}
          >
            {t("buttons.find_address")}
          </button>
        </div>
        <div className={styles["map"]}>
          <KakaoMap locations={locations} mapHeight={300 * 1.5} />
        </div>
      </div>
    </>
  );
};

export default SetLocation;
