import styles from "@/pages/ClassPages/NewReview.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NewReview = () => {
  const { t } = useTranslation();
  const [input1, setInput1] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [input3, setInput3] = useState();
  const [input4, setInput4] = useState();

  return (
    <div className={styles["new-review"]}>
      <div className={styles["page-content"]}>
        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("class.review_question1")}
          </div>

          <input
            type="text"
            className={styles["review__input"]}
            placeholder={t("class.question1_placeholder")}
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
        </div>

        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("class.review_question2")}
          </div>
          <div className={styles["input-row"]}>
            <input
              type="date"
              className={styles["review__input"]}
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            ~
            <input
              type="date"
              className={styles["review__input"]}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("class.review_question3")}
          </div>
          <div className={styles["input-row"]}>
            <input
              type="text"
              className={styles["review__input"]}
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
            />
          </div>
        </div>
        <div className={styles["input-section"]}>
          <div className={styles["section-title"]}>
            {t("class.review_question4")}
          </div>
          <textarea
            type="text"
            className={styles["review-detail__input"]}
            placeholder={t("class.question4_placeholder")}
            value={input4}
            onChange={(e) => setInput4(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewReview;
