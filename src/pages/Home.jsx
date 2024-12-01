import styles from "@/pages/Home.module.css";
import { useTranslation } from "react-i18next";
import BannerSwiper from "@/components/BannerSwiper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles["home"]}>
      <BannerSwiper />
      <div className={styles["home__contents"]}>
        <div className={styles["home__section"]}>
          <div
            className={styles["home__subtitle"]}
            onClick={() => navigate("/class")}
          >
            {t("home.subtitle1")}
            <img
              src={"/icon/icon_right_grey.png"}
              className={styles["home__right-icon"]}
            />
          </div>
        </div>
        <div className={styles["home__section"]}>
          <div
            className={styles["home__subtitle"]}
            onClick={() => navigate("/facility")}
          >
            {t("home.subtitle2")}
            <img
              src={"/icon/icon_right_grey.png"}
              className={styles["home__right-icon"]}
            />
          </div>
        </div>
        <div className={styles["home__section"]}>
          <div
            className={styles["home__subtitle"]}
            onClick={() => navigate("/community")}
          >
            {t("home.subtitle3")}
            <img
              src={"/icon/icon_right_grey.png"}
              className={styles["home__right-icon"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
