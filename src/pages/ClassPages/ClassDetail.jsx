import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/ClassPages/ClassDetail.module.css";
import ClassReviewItem from "@/components/Class/ClassReviewItem";

const ClassDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Like, setLike] = useState(false);

  const onClickLike = () => {
    setLike((prevLike) => !prevLike);
  };

  return (
    <div className={styles["class-detail"]}>
      <div className={styles["map"]} />
      <div className={styles["location-wrapper"]}>
        <img
          src={"/default/default_location.png"}
          className={styles["location-img"]}
        />
        <div className={styles["location-text-wrapper"]}>
          <div className={styles["facility-name"]}>
            시설이름 강남구스포츠센터
          </div>
          <div className={styles["facility-address"]}>
            주소입력 강남구 3049-29
          </div>
        </div>
      </div>
      <div className={styles["info-wrapper"]}>
        <div className={styles["title"]}>
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
        <div className={styles["content"]}>
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

      <div className={styles["review-wrapper"]}>
        <div className={styles["title"]}>{t("class.review_title")}</div>
        <div className={styles["review-list"]}>
          <ClassReviewItem
            instructor="홍길동"
            period="20241101 ~ 20212445"
            content="한 달 간 배우면서 실력 많이 늘었어요! 이번 달에도 신청하려고 합니다. 꼭 신청 성공하면 좋겠네요."
          />
          <ClassReviewItem
            instructor="홍길동"
            period="20241101 ~ 20212445"
            content="한 달 간 배우면서 실력 많이 늘었어요! 이번 달에도 신청하려고 합니다. 꼭 신청 성공하면 좋겠네요."
          />
        </div>
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
