import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import styles from "@/pages/ProgramPages/ProgramDetail.module.css";
import ProgramReviewItem from "@/components/Program/ProgramReviewItem";
import KakaoMap from "@/components/KakaoMap";
import useProgram from "@/hooks/useProgram";
import useAuth from "@/hooks/useAuth";
import Loading from "@/utils/Loading";

const ProgramDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Like, setLike] = useState(false);
  const [locations, setLocations] = useState(null);
  const { programDetail, getProgramDetail, toggleProgramLike, loading, error } =
    useProgram();
  const { programId } = useParams();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const initialize = async () => {
      try {
        await getProgramDetail(programId);
      } catch (err) {
        console.error("Failed to fetch entrie programs:", err);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (programDetail) {
      const coordinate = {
        lat: programDetail.facilityLatitude,
        lng: programDetail.facilityLongitude,
        name: programDetail.facilityName,
      };
      setLocations([coordinate]);
      setLike(programDetail.programData.programSaveStatus);
    } else {
      setLocations([]);
    }
  }, [programDetail]);

  const onClickLike = async () => {
    if (!isAuthenticated) {
      window.alert(t("warning.need_login"));
      navigate("/login", { state: { from: location.pathname } });
    }

    try {
      await toggleProgramLike(programId);
      setLike((prevLike) => !prevLike);
    } catch (err) {
      console.error("Failed to fetch toggle like on program:", err);
    }
  };

  if (loading || !programDetail || !locations) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles["program-detail"]}>
      {locations.length > 0 && (
        <KakaoMap locations={locations} mapHeight={300 * 0.9} />
      )}

      <div className={styles["location-wrapper"]}>
        <img
          src={
            programDetail.facilityImage
              ? programDetail.facilityImage
              : "/default/default_location.png"
          }
          className={styles["location-img"]}
        />
        <div className={styles["location-text-wrapper"]}>
          <div className={styles["facility-name"]}>
            {programDetail.facilityName}
          </div>
          <div className={styles["facility-address"]}>
            {programDetail.facilityAddr}
          </div>
        </div>
        <button
          className={styles["find-path-button"]}
          onClick={() => {
            window.open(
              `https://map.kakao.com/link/to/${programDetail.facilityName},${programDetail.facilityLatitude},${programDetail.facilityLongitude}`
            );
          }}
        >
          {t("buttons.find_path")}
        </button>
      </div>
      <div className={styles["info-wrapper"]}>
        <div className={styles["title"]}>
          {programDetail.programData.programName}
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
            <div className={styles["overflow"]}>
              {programDetail?.programData?.programTarget
                ? programDetail.programData.programTarget
                : "-"}
            </div>

            <div className={styles["overflow"]}>
              {programDetail?.programData?.programStart
                ? programDetail.programData.programStart
                : "-"}{" "}
              ~{" "}
              {programDetail?.programData?.programEnd
                ? programDetail.programData.programEnd
                : "-"}
            </div>

            <div className={styles["overflow"]}>
              {programDetail?.programData?.programWeek
                ? programDetail.programData.programWeek
                : "-"}{" "}
              {programDetail?.programData?.programTime
                ? programDetail.programData.programTime
                : "-"}
            </div>

            <div className={styles["overflow"]}>
              ₩{" "}
              {programDetail?.programData?.programPrice
                ? programDetail.programData.programPrice.toLocaleString()
                : "-"}
            </div>

            <a
              className={styles["overflow"]}
              href={
                programDetail?.programData?.programUrl
                  ? programDetail.programData.programUrl
                  : "#"
              }
              target="_blank"
            >
              {programDetail?.programData?.programUrl
                ? programDetail.programData.programUrl
                : "-"}
            </a>
          </div>
        </div>
      </div>
      <div className={styles["review-wrapper"]}>
        <div className={styles["title"]}>{t("program.review_title")}</div>
        <div className={styles["review-list"]}>
          {programDetail.reviewData.map((review) => (
            <ProgramReviewItem
              key={review.reviewId}
              instructor={review.reviewInstructor}
              period={review.reviewDuration}
              content={review.reviewPost}
            />
          ))}
          {programDetail.reviewData.length === 0 && (
            <div className={styles["empty-message"]}>{t("empty_message")}</div>
          )}
        </div>
      </div>
      <button
        className={styles["review-button"]}
        onClick={() => {
          navigate("/program/new/review", { state: { programId: programId } });
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
