import styles from "@/pages/MyPages/MyPageMain.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MyPageMain = () => {
  const { t } = useTranslation();
  const isAuthentication = false;
  const navigate = useNavigate();

  return (
    <div className={styles["my-page-main"]}>
      <div className={styles["my-page-main__section--profile"]}>
        <div className={styles["user-info__wrapper"]}>
          <img
            src={"/default/default_profile.png"}
            className={styles["profile__img"]}
          />
          <div className={styles["profile-text__wrapper"]}>
            {isAuthentication ? (
              <>
                <div className={styles["profile__nickname"]}>닉네임</div>
                <div className={styles["profile__id"]}>@아이디d4f5g4d8</div>
              </>
            ) : (
              <div
                className={styles["profile__auth-false"]}
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
        <div className={styles["my-page-main__buttons"]}>
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

      <div className={styles["my-page-main__menus"]}>
        <div className={styles["my-page-main__section"]}>
          <div className={styles["section__title"]}>{t("menus.class")}</div>
          <div
            className={styles["section__menu"]}
            onClick={() => {
              navigate("/mypage/class/save");
            }}
          >
            {t("mypage.myclass")}
          </div>
          <div
            className={styles["section__menu"]}
            onClick={() => {
              navigate("/mypage/class/review");
            }}
          >
            {t("mypage.myreview")}
          </div>
        </div>

        <div className={styles["my-page-main__section"]}>
          <div className={styles["section__title"]}>{t("menus.community")}</div>
          <div
            className={styles["section__menu"]}
            onClick={() => {
              navigate("/mypage/community/post");
            }}
          >
            {t("mypage.mypost")}
          </div>
          <div
            className={styles["section__menu"]}
            onClick={() => {
              navigate("/mypage/community/comment");
            }}
          >
            {t("mypage.mycomment")}
          </div>
          <div
            className={styles["section__menu"]}
            onClick={() => {
              navigate("/mypage/community/save");
            }}
          >
            {t("mypage.mysave")}
          </div>
        </div>
        <div className={styles["my-page-main__section"]}>
          <div className={styles["section__title"]}>{t("mypage.etc")}</div>
          <div className={styles["section__menu"]}>{t("mypage.logout")}</div>
          <div
            className={styles["section__menu"]}
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
