import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/pages/MyPages/User/EditProfile.module.css";

const EditProfile = () => {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState("기존 아이디");

  return (
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
