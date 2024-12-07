import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/LoginPages/AdditionalInfo.module.css";
import LocationInput from "@/components/LocationInput";
import useAuth from "@/hooks/useAuth";
import { validateNickname } from "@/utils/Validator";
import { useLocation, useNavigate } from "react-router-dom";

const AdditionalInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [nickname, setNickname] = useState("");
  const [region, setRegion] = useState("");
  const [openPostcode, setOpenPostcode] = useState(false);

  const [nicknameErrors, setNicknameErrors] = useState(null);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const { isDuplicate, checkNicknameDuplicate, onBoard } = useAuth();

  useEffect(() => {
    if (!location.state?.isLogin) {
      window.alert(t("warning.access"));
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate]);

  const handle = {
    clickButton: () => setOpenPostcode(true),
    closePopup: () => setOpenPostcode(false),
  };

  const handleAddressSelect = (address) => {
    setRegion(address);
    setOpenPostcode(false);
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    // 닉네임 변경 시 실시간 검증
    const error = validateNickname(value, t);
    setNicknameErrors(error);

    // 중복 체크 상태 초기화
    if (nicknameCheck) {
      setNicknameCheck(false);
    }
  };

  const handleDuplicateCheckButtonClicked = async () => {
    if (nicknameErrors) return; // 현재 오류가 있다면 실행하지 않음

    try {
      await checkNicknameDuplicate(nickname);
      if (isDuplicate) {
        setNicknameErrors(t("nickname_message.in_use"));
      } else {
        setNicknameErrors(null);
        setNicknameCheck(true);
      }
    } catch (error) {
      setNicknameErrors(t("nickname_message.error"));
    }
  };

  const handleDoneButtonClicked = async () => {
    const nicknameError = validateNickname(nickname, t);

    if (nicknameError || !region) {
      setNicknameErrors(nicknameError);
      window.alert(t("nickname_message.empty"));
      return;
    }

    if (!nicknameCheck) {
      window.alert(t("nickname_message.check_first"));
      return;
    }

    try {
      await onBoard(nickname, region);
      navigate("/");
    } catch (error) {
      console.error("kakao Login failed", error);
    }
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
              onChange={handleNicknameChange}
            />
            <button
              className={styles["input-button"]}
              onClick={handleDuplicateCheckButtonClicked}
            >
              {t("buttons.duplication_check")}
            </button>
          </div>
          {nicknameErrors && (
            <div className={styles["error-message"]}>{nicknameErrors}</div>
          )}
          {!nicknameErrors && !nicknameCheck && (
            <div className={styles["default-message"]}>
              {t("nickname_message.default")}
            </div>
          )}
          {nicknameCheck && (
            <div className={styles["check-message"]}>
              {t("nickname_message.ok")}
            </div>
          )}
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
              value={region}
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

      <button
        className={styles["done-button"]}
        onClick={handleDoneButtonClicked}
      >
        {t("buttons.done")}
      </button>

      {openPostcode && (
        <div className={styles["popup-overlay"]}>
          <LocationInput onSelectAddress={handleAddressSelect} />
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;
