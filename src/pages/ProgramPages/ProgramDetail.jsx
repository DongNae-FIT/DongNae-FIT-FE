import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "@/pages/ProgramPages/ProgramDetail.module.css";
import ProgramReviewItem from "@/components/Program/ProgramReviewItem";
import KakaoMap from "@/components/KakaoMap";

const ProgramDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Like, setLike] = useState(false);
  const locations = [{ lat: 37.5665, lng: 126.978, name: "서울" }];

  const onClickLike = () => {
    setLike((prevLike) => !prevLike);
  };

  return (
    <div className={styles["program-detail"]}>
      <div className={styles["map"]}>
        <KakaoMap locations={locations} mapHeight={300 * 0.9} />
      </div>
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
        <button
          className={styles["find-path-button"]}
          onClick={() => {
            window.open(
              "https://map.kakao.com/link/to/${facilityAddr},${facilityLatitude},${facilityLongitude}"
            );
          }}
        >
          {t("buttons.find_path")}
        </button>
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
            className={styles["program-like-icon"]}
            onClick={onClickLike}
          />
        </div>
        <div className={styles["content"]}>
          <div className={styles["content-left"]}>
            <div>{t("program.target")}</div>
            <div>{t("program.period")}</div>
            <div>{t("program.day_and_time")}</div>
            <div>{t("program.price")}</div>
            <div>{t("program.url")}</div>
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
        <div className={styles["title"]}>{t("program.review_title")}</div>
        <div className={styles["review-list"]}>
          <ProgramReviewItem
            instructor="홍길동"
            period="20241101 ~ 20212445"
            content="한 달 간 배우면서 실력 많이 늘었어요! 이번 달에도 신청하려고 합니다. 꼭 신청 성공하면 좋겠네요."
          />
          <ProgramReviewItem
            instructor="홍길동"
            period="20241101 ~ 20212445"
            content="한 달 간 배우면서 실력 많이 늘었어요! 이번 달에도 신청하려고 합니다. 꼭 신청 성공하면 좋겠네요."
          />
        </div>
      </div>

      <button
        className={styles["review-button"]}
        onClick={() => {
          navigate("/program/review/new");
        }}
      >
        <img
          src={"/icon/icon_write_colored.png"}
          className={styles["write-icon"]}
        />
        {t("program.review_button")}
      </button>
    </div>
  );
};

export default ProgramDetail;
