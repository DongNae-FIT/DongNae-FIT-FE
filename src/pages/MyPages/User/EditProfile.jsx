import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/MyPages/User/EditProfile.module.css";
import EditorHeader from "@/layouts/Header/EditorHeader";
import { useNavigate } from "react-router-dom";
import useMyPage from "@/hooks/useMyPage";
import { validateNickname } from "@/utils/Validator";
import useAuth from "@/hooks/useAuth";
import Loading from "@/utils/Loading";

const EditProfile = () => {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState("기존 닉네임");
  const navigate = useNavigate();
  const { user, getUserInfo, changeNickname, loading, error } = useMyPage();
  const { isDuplicate, checkNicknameDuplicate } = useAuth();
  const [nicknameErrors, setNicknameErrors] = useState(null);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getUserInfo();
      } catch (err) {
        console.error("Failed to fetch use Info:", err);
      }
    };
    initialize(); // 초기화 함수 실행
    setNickname(user.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !user) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
    if (nicknameErrors) return;

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

  const onDoneClick = async () => {
    const nicknameError = validateNickname(nickname, t);

    if (nicknameError || !location) {
      setNicknameErrors(nicknameError);
      window.alert(t("nickname_message.empty"));
      return;
    }

    if (!nicknameCheck) {
      window.alert(t("nickname_message.check_first"));
      return;
    }

    try {
      await changeNickname(nickname);
      navigate(`/mypage`);
    } catch (error) {
      console.error("Nickname check failed", error);
    }
  };

  return (
    <>
      <EditorHeader title={t("mypage.edit_profile")} onClick={onDoneClick} />

      <div className={styles["edit-profile"]}>
        <div className={styles["profile-image-container"]}>
          <img
            src={user.progile ? user.profile : "/default/default_profile.png"}
            className={styles["profile-img"]}
          />
        </div>
        <div className={styles["section"]}>
          <div className={styles["section-title"]}>{t("mypage.nickname")}</div>
          <div className={styles["input-row"]}>
            <input
              type="text"
              className={styles["input"]}
              placeholder={t("additional_info.nickname_placeholder")}
              value={nickname}
              onChange={handleNicknameChange}
            />
            <button
              className={styles["duplicate-check-button"]}
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
      </div>
    </>
  );
};

export default EditProfile;
