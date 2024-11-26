import styles from "@/pages/MyPages/MyPageMain.module.css";
import { useTranslation } from "react-i18next";

const MyPageMain = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["my-page-main"]}>
      <div className={styles["my-page-main__section--profile"]}>
        <div className={styles["user-info__wrapper"]}>
          <img
            src={"/default/default_profile.png"}
            className={styles["profile__img"]}
          />
          <div className={styles["profile-text__wrapper"]}>
            <div className={styles["profile__nickname"]}>닉네임</div>
            <div className={styles["profile__id"]}>@아이디d4f5g4d8</div>
          </div>
        </div>
        <div className={styles["my-page-main__buttons"]}>
          <button className={styles["button"]}>
            {t("mypage.edit_profile")}
          </button>
          <button className={styles["button"]}>
            {t("mypage.set_locaiton")}
          </button>
        </div>
      </div>

      <div className={styles["my-page-main__menus"]}>
        <div className={styles["my-page-main__section"]}>
          <div className={styles["section__title"]}>{t("menus.class")}</div>
          <div className={styles["section__menu"]}>{t("mypage.myclass")}</div>
          <div className={styles["section__menu"]}>{t("mypage.myreview")}</div>
        </div>
        <div className={styles["my-page-main__section"]}>
          <div className={styles["section__title"]}>{t("menus.community")}</div>
          <div className={styles["section__menu"]}>{t("mypage.mypost")}</div>
          <div className={styles["section__menu"]}>{t("mypage.mycomment")}</div>
          <div className={styles["section__menu"]}>{t("mypage.mysave")}</div>
        </div>
        <div className={styles["my-page-main__section"]}>
          <div className={styles["section__title"]}>{t("mypage.etc")}</div>
          <div className={styles["section__menu"]}>{t("mypage.logout")}</div>
          <div className={styles["section__menu"]}>{t("mypage.delete")}</div>
        </div>
      </div>
    </div>
  );
};

export default MyPageMain;
