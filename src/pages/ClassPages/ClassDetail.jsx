import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/ClassPages/ClassDetail.module.css";

const ClassDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Like, setLike] = useState(false);

  const onClickLike = () => {
    setLike((prevLike) => !prevLike);
  };

  return (
    <div className={styles["class-detail"]}>
      <div className={styles["map-wrapper"]} />
      <div className={styles["location-wrapper"]}>
        <img
          src={"/default/default_location.png"}
          className={styles["location-img"]}
        />
        <div className={styles["location-text-wrapper"]}>
          <div className={styles["center-name"]}>시설이름 강남구스포츠센터</div>
          <div className={styles["center-address"]}>
            주소입력 강남구 3049-29
          </div>
        </div>
      </div>
      <div className={styles["section"]}>
        <div className={styles["section-title"]}>
          강좌명 오전골프05
          <img
            src={
              Like
                ? "/icon/icon_filled_heart.png"
                : "/icon/icon_empty_heart.png"
            }
            className={styles["class-like-icon"]}
            onClick={onClickLike}
          />
        </div>
        <div className={styles["section-content"]}>
          <div className={styles["content-left"]}>
            <div>{t("class.target")}</div>
            <div>{t("class.period")}</div>
            <div>{t("class.day_and_time")}</div>
            <div>{t("class.price")}</div>
            <div>{t("class.url")}</div>
          </div>
          <div className={styles["content-right"]}>
            <div>성인</div>
            <div>월수금</div>
            <div>성인</div>
            <div>월수금</div>
            <div>요일</div>
          </div>
        </div>
      </div>

      <div className={styles["section"]}>
        <div className={styles["section-title"]}>{t("class.review_title")}</div>
        <div className={styles["review"]}>후기 </div>
      </div>

      <button
        className={styles["review-button"]}
        onClick={() => {
          navigate("/class/review/new");
        }}
      >
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write-icon"]}
        />
        {t("class.review_button")}
      </button>
    </div>
  );
};

export default ClassDetail;
