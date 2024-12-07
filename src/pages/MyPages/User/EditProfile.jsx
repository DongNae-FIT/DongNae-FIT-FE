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
    const error = validateNickname(value);
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
        setNicknameErrors("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameErrors(null);
        setNicknameCheck(true);
      }
    } catch (error) {
      setNicknameErrors("닉네임 중복 확인에 실패했습니다.");
    }
  };

  const onDoneClick = async () => {
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
      await changeNickname(nickname);
      navigate(`/mypage`);
    } catch (error) {
      window.alert("오류가 발생하였습니다.");
      navigate("/error");
      console.error("kakao Login failed", error);
    }
  };

  return (
    <>
      <EditorHeader title={t("mypage.edit_profile")} onClick={onDoneClick} />

      <div className={styles["edit-profile"]}>
        <div className={styles["profile-image-container"]}>
          <img
            src={"/default/default_profile.png"}
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
            <div className={styles["default-message"]}>{"한영 2~7자"}</div>
          )}
          {nicknameCheck && (
            <div className={styles["check-message"]}>
              {"사용 가능한 닉네임입니다."}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
