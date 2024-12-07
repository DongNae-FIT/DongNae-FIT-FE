import { useEffect, useState, useRef } from "react";
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
  const [nickname, setNickname] = useState();
  const navigate = useNavigate();
  const { user, getUserInfo, changeprofile, changeNickname, loading, error } =
    useMyPage();
  const { isDuplicate, checkNicknameDuplicate } = useAuth();
  const [nicknameErrors, setNicknameErrors] = useState(null);
  const [nicknameCheck, setNicknameCheck] = useState(false);

  const profileImg = useRef(null); // useRef로 변경
  const [previewImg, setPreviewImg] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await getUserInfo();
        setPreviewImg(
          user.profile ? user.profile : "/default/default_profile.png"
        );
        setNickname(user.name);
      } catch (err) {
        console.error("Failed to fetch use Info:", err);
      }
    };
    initialize(); // 초기화 함수 실행
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
    const isNicknameChanged = nickname !== user.name;
    const isProfileChanged = profileImg.current?.files[0] !== undefined;

    try {
      // 닉네임만 변경된 경우
      if (isNicknameChanged && !isProfileChanged) {
        const nicknameError = validateNickname(nickname, t);

        if (nicknameError) {
          setNicknameErrors(nicknameError);
          window.alert(t("nickname_message.invalid"));
          return;
        }

        if (!nicknameCheck) {
          window.alert(t("nickname_message.check_first"));
          return;
        }

        try {
          await changeNickname(nickname);
          navigate("/mypage");
        } catch (err) {
          console.log(err);
        }
      }

      // 이미지만 변경된 경우
      if (!isNicknameChanged && isProfileChanged) {
        const formData = new FormData();
        formData.append("profile", profileImg.current.files[0]);
        try {
          await changeprofile(formData);
          navigate("/mypage");
        } catch (err) {
          console.log(err);
        }
      }

      // 둘 다 변경된 경우
      if (isNicknameChanged && isProfileChanged) {
        const nicknameError = validateNickname(nickname, t);

        if (nicknameError) {
          setNicknameErrors(nicknameError);
          window.alert(t("nickname_message.invalid"));
          return;
        }

        if (!nicknameCheck) {
          window.alert(t("nickname_message.check_first"));
          return;
        }

        const formData = new FormData();
        formData.append("file", profileImg.current.files[0]);
        formData.append("nickname", nickname);

        // 닉네임 중복 검사 통과 후 요청
        try {
          await changeNickname({ nickname });
          await changeprofile(formData);
          navigate("/mypage");
        } catch (err) {
          console.log(err);
        }
      }

      if (!isNicknameChanged && !isProfileChanged) {
        alert(t("profile_message.no_changes"));
      }
    } catch (error) {
      console.error("프로필 업데이트 중 에러 발생:", error);
      alert(t("profile_message.error"));
    }
  };

  const handleProfileUpload = () => {
    profileImg.current?.click();
  };

  const handlePreview = () => {
    if (profileImg.current?.files != null)
      setPreviewImg(URL.createObjectURL(profileImg.current?.files[0]));
  };

  return (
    <>
      <EditorHeader title={t("mypage.edit_profile")} onClick={onDoneClick} />

      <div className={styles["edit-profile"]}>
        <div className={styles["profile-image-container"]}>
          <input
            accept="image/*"
            onChange={handlePreview}
            ref={profileImg}
            type="file"
            className={styles["profile-input"]}
          ></input>
          <img
            src={previewImg}
            className={styles["profile-img"]}
            onClick={handleProfileUpload}
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
