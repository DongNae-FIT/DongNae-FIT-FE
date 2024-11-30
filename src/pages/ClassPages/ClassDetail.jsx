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
      <div className={styles["class-detail__map"]} />
      <div className={styles["class__section--location"]}>
        <img
          src={"/default/default_location.png"}
          className={styles["location__img"]}
        />
        <div className={styles["location-text__wrapper"]}>
          <div className={styles["location__name"]}>
            시설이름 강남구스포츠센터
          </div>
          <div className={styles["location__address"]}>
            주소입력 강남구 3049-29
          </div>
        </div>
      </div>
      <div className={styles["class__section"]}>
        <div className={styles["section__title"]}>
          강좌명 오전골프05
          <img
            src={
              Like
                ? "/icon/icon_filled_heart.png"
                : "/icon/icon_empty_heart.png"
            }
            className={styles["class_likes-icon"]}
            onClick={onClickLike}
          />
        </div>
        <div className={styles["section__content"]}>
          <div className={styles["content__left"]}>
            <div>{t("class.target")}</div>
            <div>{t("class.period")}</div>
            <div>{t("class.day_and_time")}</div>
            <div>{t("class.price")}</div>
            <div>{t("class.url")}</div>
          </div>
          <div className={styles["content__right"]}>
            <div>성인</div>
            <div>월수금</div>
            <div>성인</div>
            <div>월수금</div>
            <div>요일</div>
          </div>
        </div>
      </div>

      <div className={styles["class__section"]}>
        <div className={styles["section__title"]}>
          {t("class.review_title")}
        </div>
        <div className={styles["class__review"]}>후기 </div>
      </div>

      <button
        className={styles["write__button"]}
        onClick={() => {
          navigate("/class/review/new");
        }}
      >
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write__icon"]}
        />
        {t("class.review_button")}
      </button>
    </div>
  );
};

export default ClassDetail;
