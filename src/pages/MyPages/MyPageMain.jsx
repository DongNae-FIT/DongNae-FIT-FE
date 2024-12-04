import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "@/pages/MyPages/MyPageMain.module.css";

const MyPageMain = () => {
  const { t } = useTranslation();
  const isAuthentication = false;
  const navigate = useNavigate();

  return (
    <div className={styles["my-page-main"]}>
      <div className={styles["profile-container"]}>
        <div className={styles["user-info-wrapper"]}>
          <img
            src={"/default/default_profile.png"}
            className={styles["user-info-img"]}
          />
          <div className={styles["user-info-text"]}>
            {isAuthentication ? (
              <>
                <div className={styles["nickname"]}>닉네임</div>
                <div className={styles["id"]}>@아이디d4f5g4d8</div>
              </>
            ) : (
              <div
                className={styles["nav-login"]}
                onClick={() => {
                  navigate("/login");
                }}
              >
                {t("mypage.auth_false")}
                <img
                  src={"/icon/icon_right_grey.png"}
                  className={styles["right-arrow-icon"]}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles["button-wrapper"]}>
          <button
            className={styles["button"]}
            onClick={() => {
              navigate("/mypage/edit/profile");
            }}
          >
            {t("mypage.edit_profile")}
          </button>
          <button
            className={styles["button"]}
            onClick={() => {
              navigate("/mypage/set/location");
            }}
          >
            {t("mypage.set_location")}
          </button>
        </div>
      </div>

      <div className={styles["menu-wrapper"]}>
        <div className={styles["menu-section"]}>
          <div className={styles["section-title"]}>{t("menus.program")}</div>
          <div
            className={styles["menu"]}
            onClick={() => {
              navigate("/mypage/program/save");
            }}
          >
            {t("mypage.myprogram")}
          </div>
          <div
            className={styles["menu"]}
            onClick={() => {
              navigate("/mypage/program/review");
            }}
          >
            {t("mypage.myreview")}
          </div>
        </div>

        <div className={styles["menu-section"]}>
          <div className={styles["section-title"]}>{t("menus.community")}</div>
          <div
            className={styles["menu"]}
            onClick={() => {
              navigate("/mypage/community/post");
            }}
          >
            {t("mypage.mypost")}
          </div>
          <div
            className={styles["menu"]}
            onClick={() => {
              navigate("/mypage/community/comment");
            }}
          >
            {t("mypage.mycomment")}
          </div>
          <div
            className={styles["menu"]}
            onClick={() => {
              navigate("/mypage/community/save");
            }}
          >
            {t("mypage.mysave")}
          </div>
        </div>
        <div className={styles["menu-section"]}>
          <div className={styles["section-title"]}>{t("mypage.etc")}</div>
          <div className={styles["menu"]}>{t("mypage.logout")}</div>
          <div
            className={styles["menu"]}
            onClick={() => {
              navigate("/delete/account");
            }}
          >
            {t("mypage.delete")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageMain;
