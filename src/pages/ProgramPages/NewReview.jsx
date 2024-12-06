import styles from "@/pages/ProgramPages/NewReview.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditorHeader from "@/layouts/Header/EditorHeader";
import useProgram from "@/hooks/useProgram";
import { useLocation, useNavigate } from "react-router-dom";

const NewReview = () => {
  const { t } = useTranslation();
  const [instructor, setInstructor] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reviewDetails, setReviewDetails] = useState("");
  const { saveNewReview, loading, error } = useProgram();
  const navigate = useNavigate();
  const location = useLocation();

  const programId = location.state.programId;

  const onDoneClick = async () => {
    try {
      const period = (dateFrom + "~" + dateTo).replaceAll("-", "");
      await saveNewReview(programId, instructor, period, reviewDetails);
      navigate(`/program/${programId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDateFromChange = (e) => {
    const newDateFrom = e.target.value;
    setDateFrom(newDateFrom);

    // dateTo가 dateFrom보다 작은 경우 dateTo 초기화
    if (dateTo && new Date(newDateFrom) > new Date(dateTo)) {
      setDateTo("");
    }
  };

  const handleDateToChange = (e) => {
    const newDateTo = e.target.value;
    setDateTo(newDateTo);

    // dateFrom이 dateTo보다 큰 경우 dateFrom 초기화
    if (dateFrom && new Date(newDateTo) < new Date(dateFrom)) {
      setDateFrom("");
    }
  };
  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <>
      <EditorHeader title={t("program.review_write")} onClick={onDoneClick} />
      <div className={styles["new-review"]}>
        <div className={styles["container"]}>
          <div className={styles["input-section"]}>
            <div className={styles["section-title"]}>
              {t("program.review_question1")}
            </div>
            <input
              type="text"
              className={styles["review__input"]}
              placeholder={t("program.question1_placeholder")}
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />
          </div>

          <div className={styles["input-section"]}>
            <div className={styles["section-title"]}>
              {t("program.review_question2")}
            </div>
            <div className={styles["input-row"]}>
              <input
                type="date"
                className={styles["review__input"]}
                value={dateFrom}
                onChange={handleDateFromChange}
                max={dateTo || undefined}
              />
              ~
              <input
                type="date"
                className={styles["review__input"]}
                value={dateTo}
                onChange={handleDateToChange}
                min={dateFrom || undefined}
              />
            </div>
          </div>

          <div className={styles["input-section"]}>
            <div className={styles["section-title"]}>
              {t("program.review_question4")}
            </div>
            <textarea
              className={styles["review-detail-input"]}
              placeholder={t("program.question4_placeholder")}
              value={reviewDetails}
              onChange={(e) => setReviewDetails(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReview;
