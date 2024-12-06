import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/LoginPages/AdditionalInfo.module.css";
import LocationInput from "@/components/LocationInput";
import useAuth from "@/hooks/useAuth";
import { validateNickname } from "@/utils/Validator";
import { useNavigate } from "react-router-dom";

const AdditionalInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [location, setLocation] = useState("");
  const [openPostcode, setOpenPostcode] = useState(false);

  const [nicknameErrors, setNicknameErrors] = useState(null);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const { isDuplicate, checkNicknameDuplicate, onBoard } = useAuth();

  const handle = {
    clickButton: () => setOpenPostcode(true),
    closePopup: () => setOpenPostcode(false),
  };

  const handleAddressSelect = (address) => {
    setLocation(address);
    setOpenPostcode(false);
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    // 닉네임 변경 시 실시간 검증
    const error = validateNickname(value);
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
        setNicknameErrors("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameErrors(null);
        setNicknameCheck(true);
      }
    } catch (error) {
      setNicknameErrors("닉네임 중복 확인에 실패했습니다.");
    }
  };

  const handleDoneButtonClicked = async () => {
    const nicknameError = validateNickname(nickname);

    if (nicknameError || !location) {
      setNicknameErrors(nicknameError);
      window.alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!nicknameCheck) {
      window.alert("닉네임 중복 확인을 먼저 해주세요.");
      return;
    }

    try {
      await onBoard(nickname, location);
      if (window.confirm("정상적으로 로그인 되었습니다. 홈으로 이동합니다.")) {
        navigate("/");
      }
    } catch (error) {
      window.alert("오류가 발생하였습니다.");
      navigate("/error");
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
            <div className={styles["default-message"]}>{"한영 2~7자"}</div>
          )}
          {nicknameCheck && (
            <div className={styles["check-message"]}>
              {"사용 가능한 닉네임입니다."}
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
