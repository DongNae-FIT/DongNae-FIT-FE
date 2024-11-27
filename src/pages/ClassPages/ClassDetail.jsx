import { useState, useEffect, useRef } from "react";
import styles from "@/pages/ClassPages/ClassDetail.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ClassDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Like, setLike] = useState(false);

  const onClickLike = () => {
    setLike((prevLike) => !prevLike);
  };

  const Divider = () => (
    <div style={{ height: "1px", backgroundColor: "var(--sub-grey)" }} />
  );

  return (
    <div className={styles["class-detail"]}>
      <div className={styles["class-detail__img"]}>
        {/* <img
          src={""}
          className={styles[""]}
        /> */}
      </div>
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
            <div>대상</div>
            <div>요일</div>
            <div>대상</div>
            <div>요일</div>
            <div>요일</div>
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
        <div className={styles["section__title"]}>강좌 후기</div>
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <div className={styles["class__review"]}>후기 {index + 1}</div>
            {index < 2 && <Divider />}
          </div>
        ))}
      </div>

      <button className={styles["write__button"]}>
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write__icon"]}
          onClick={() => {}}
        />
        {t("class.review_button")}
      </button>
    </div>
  );
};

export default ClassDetail;
