import styles from "@/pages/MyPages/User/EditProfile.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState("기존 아이디");
  const navigate = useNavigate();

  return (
    <div className={styles["edit-profile"]}>
      <div className={styles["edit-profile__img"]}>
        <img
          src={"/default/default_profile.png"}
          className={styles["profile__img"]}
        />
      </div>
      <div className={styles["edit-profile__nickname"]}>
        <div className={styles["nickname-title"]}>{t("mypage.nickname")}</div>
        <div className={styles["nickname-row"]}>
          <input
            type="text"
            className={styles["info__input"]}
            placeholder={t("additional_info.nickname_placeholder")}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className={styles["duplicate-check-button"]}>
            {t("buttons.duplication_check")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
