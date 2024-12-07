import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "@/pages/MyPages/MyPageMain.module.css";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import useMyPage from "@/hooks/useMyPage";
import Loading from "@/utils/Loading";

const MyPageMain = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { user, getUserInfo, loading, error } = useMyPage();

  useEffect(() => {
    if (isAuthenticated) {
      const initialize = async () => {
        try {
          await getUserInfo();
        } catch (err) {
          console.error("Failed to fetch use Info:", err);
        }
      };
      initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An unknown error occurred";
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className={styles["my-page-main"]}>
      <div className={styles["profile-container"]}>
        <div className={styles["user-info-wrapper"]}>
          <img
            src={
              isAuthenticated
                ? user.profile
                  ? user.profile
                  : "/default/default_profile.png"
                : "/default/default_profile.png"
            }
            className={styles["user-info-img"]}
          />
          <div className={styles["user-info-text"]}>
            {isAuthenticated ? (
              <>
                <div className={styles["nickname"]}>{user.name}</div>
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
          <div className={styles["menu"]} onClick={handleLogout}>
            {t("mypage.logout")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageMain;
